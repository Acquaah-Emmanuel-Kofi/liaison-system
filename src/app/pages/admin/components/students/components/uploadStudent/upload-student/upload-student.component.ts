import { Component, inject, OnDestroy } from '@angular/core';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { DataService } from '../../../../../service/student-upload/data.service';
import * as XLSX from 'xlsx';
import { MessageService } from 'primeng/api';
import { SidebarService } from '../../../../../../../shared/services/sidebar/sidebar.service';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { LoaderModalComponent } from '../../../../../../../shared/components/loader-modal/loader-modal/loader-modal.component';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { studentsQueryKey } from '../../../../../../../shared/helpers/query-keys.helper';
import { ICommonResponse } from '../../../../../../../shared/interfaces/response.interface';

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
  selectedFileName!: string;
  selectedFile!: File; // Track the selected file
  isDataImported: boolean = false;
  isModalOpen: boolean = false;

  private _router = inject(Router);

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>event.target;
    if (target.files.length !== 1) {
      alert('Please select only one file.');
      return;
    }

    const file: File = target.files[0];
    this.selectedFileName = file.name;
    this.selectedFile = file; // Store the selected file
    this.processFile(file);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.selectedFile = file; // Store the selected file
      this.processFile(file);
    }
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
      const fileHeaders = data[0].map((header: string) => header.trim());
      this.dataService.headers = fileHeaders;

      // Define expected headers
      const expectedHeaders = [
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

      // Validate headers
      if (JSON.stringify(fileHeaders) !== JSON.stringify(expectedHeaders)) {
        this.messageService.add({
          severity: 'info',
          summary: 'Info',
          detail: 'Excel headers do not match the expected format.',
        });

        // Do not show the table if headers are incorrect
        this.isDataImported = false;
        return;
      }

      // Process and store the data using the data service
      const students = data.slice(1).map((row: any) => {
        const student: any = {};
        fileHeaders.forEach((header: string, index: number) => {
          student[header] = row[index] || '';
        });
        return student;
      });

      this.dataService.students = students;
      this.showTable();
      this.isDataImported = true;
    };

    reader.readAsBinaryString(file);
  }

  removeFile() {
    this.resetData();
  }

  resetData() {
    this.selectedFileName = '';
    this.selectedFile = undefined!;
    this.isDataImported = false;
    this.dataService.headers = [];
    this.dataService.students = [];
  }

  showTable() {
    document.getElementById('dropZone')!.style.display = 'none';
    document.getElementById('tableArea')!.classList.remove('hidden');
    document.getElementById('fileDisplayArea')!.classList.remove('hidden');
  }

  submitData() {
    this.isModalOpen = true;
    if (!this.selectedFile) {
      this.showAlert('error', 'No file selected for submission.');
      this.isModalOpen = false;
      return;
    }

    this.uploadFile.mutate();
  }

  uploadFile = injectMutation((client) => ({
    mutationFn: async () =>
      await this.dataService.sendFileToBackend(this.selectedFile,true),
    onSuccess: (response) => {
      client.invalidateQueries({queryKey: studentsQueryKey.data()}).then();
      this.handleResponse(response as ICommonResponse);
    },
    onError: (error) => {
      this.showAlert('error', error?.message);
      client.invalidateQueries({queryKey: studentsQueryKey.data()}).then();
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
