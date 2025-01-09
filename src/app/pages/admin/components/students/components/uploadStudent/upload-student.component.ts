import { Component, inject, OnDestroy, signal } from '@angular/core';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { DataService } from '../../../../service/student-upload/data.service';
import * as XLSX from 'xlsx';
import { MessageService } from 'primeng/api';
import { SidebarService } from '../../../../../../shared/services/sidebar/sidebar.service';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { LoaderModalComponent } from '../../../../../../shared/components/loader-modal/loader-modal/loader-modal.component';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { studentsQueryKey } from '../../../../../../shared/helpers/query-keys.helper';
import { ICommonResponse } from '../../../../../../shared/interfaces/response.interface';
import { validateHeaders } from '../../../../../../shared/helpers/functions.helper';

@Component({
  selector: 'liaison-upload-student',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgClass,
    AsyncPipe,
    ToastModule,
    LoaderModalComponent,
  ],
  templateUrl: './upload-student.component.html',
  styleUrls: ['./upload-student.component.scss'],
  providers: [MessageService],
})
export class UploadStudentComponent implements OnDestroy {
  messageService = inject(MessageService);
  dataService = inject(DataService);
  sidebarService = inject(SidebarService);
  selectedFileName = signal<string>('');
  selectedFile = signal<File | undefined>(undefined);

  fileHeaders = signal<string[]>([]);
  fileData = signal<any[]>([]);

  isDataImported: boolean = false;
  isModalOpen: boolean = false;

  private _router = inject(Router);

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>event.target;
    if (target.files.length !== 1) {
      this.showAlert('error', 'Please select only one file.');
      return;
    }

    const file: File = target.files[0];
    this.selectedFileName.set(file.name);
    this.selectedFile.set(file);
    this.setAndProcessFile(file);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    file && this.setAndProcessFile(file);
  }

  setAndProcessFile(file: File) {
    this.selectedFileName.set(file.name);
    this.selectedFile.set(file);
    this.processFile(file);
  }

  processFile(file: File) {
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const binaryString: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(binaryString, {
        type: 'binary',
      });

      // Read data from the first sheet
      const sheetName: string = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

      // Convert sheet to JSON format
      const data: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Extract headers dynamically from the first row
      const fileHeaders: string[] = data[0].map((header: string) =>
        header.trim()
      );

      // Define expected headers
      const expectedHeaders: string[] = [
        'Student ID',
        'First Name',
        'Last Name',
        'Other Name',
        'Faculty',
        'Department',
        'Age',
        'Gender',
        'About',
        'Password',
        'Course',
        'Email',
        'Telephone number',
        'Place of Internship',
        'Start date',
        'End date',
        'Status',
      ];

      const { isValid, missingHeaders, unexpectedHeaders } = validateHeaders(
        fileHeaders,
        expectedHeaders
      );

      if (!isValid) {
        if (missingHeaders.length > 0) {
          this.messageService.add({
            severity: 'info',
            summary: 'Missing header(s)',
            detail: missingHeaders.join(', '),
          });
        }

        if (unexpectedHeaders.length > 0) {
          this.messageService.add({
            severity: 'error',
            summary: 'Unexpected header(s) found',
            detail: unexpectedHeaders.join(', '),
          });
        }

        this.messageService.add({
          severity: 'info',
          summary: 'Info',
          detail: 'Excel headers do not match the expected format.',
        });

        this.isDataImported = false;
        return;
      }

      this.fileHeaders.set(fileHeaders);

      // Process and store the data using the data service
      const fileData = data.slice(1).map((row: any) => {
        const student: any = {};
        fileHeaders.forEach((header: string, index: number) => {
          student[header] = row[index] || '';
        });
        return student;
      });

      this.fileData.set(fileData);
      this.showTable();
      this.isDataImported = true;
    };

    reader.readAsBinaryString(file);
  }

  removeFile() {
    this.resetData();
  }

  resetData() {
    this.selectedFileName.set('');
    this.selectedFile.set(undefined);
    this.isDataImported = false;
  }

  showTable() {
    document.getElementById('dropZone')!.style.display = 'none';
    document.getElementById('tableArea')!.classList.remove('hidden');
    document.getElementById('fileDisplayArea')!.classList.remove('hidden');
  }

  submitData() {
    this.isModalOpen = true;
    if (!this.selectedFile()) {
      this.showAlert('error', 'No file selected for submission.');
      this.isModalOpen = false;
      return;
    }

    this.uploadFile.mutate();
  }

  uploadFile = injectMutation((client) => ({
    mutationFn: async () =>
      await this.dataService.sendFileToBackend(this.selectedFile()!, 'student'),
    onSuccess: (response) => {
      client.invalidateQueries({ queryKey: studentsQueryKey.all });
      this.handleResponse(response as ICommonResponse);
    },
    onError: (error) => {
      this.showAlert('error', error?.message);
      this.isModalOpen = false;
    },
  }));

  handleResponse(response: ICommonResponse) {
    if (response.status === 201) {
      this.isModalOpen = false;
      this.showAlert('success', response.message);
      setTimeout(() => {
        this._router.navigate(['/admin/students']).then();
      }, 2000);
    } else {
      this.showAlert('error', response.message);
      this.isModalOpen = false;
    }
  }

  showAlert(type: 'error' | 'success', message: string) {
    this.messageService.add({
      severity: type,
      summary: type === 'success' ? 'Success' : 'Error',
      detail: message,
    });
    this.isModalOpen = false;
  }

  ngOnDestroy() {
    this.resetData();
  }
}
