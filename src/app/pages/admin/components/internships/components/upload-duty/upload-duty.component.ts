import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, signal } from '@angular/core';
import { LoaderModalComponent } from '../../../../../../shared/components/loader-modal/loader-modal/loader-modal.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DataService } from '../../../../service/student-upload/data.service';
import { SidebarService } from '../../../../../../shared/services/sidebar/sidebar.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { ICommonResponse } from '../../../../../../shared/interfaces/response.interface';
import { attachmentsQueryKey } from '../../../../../../shared/helpers/query-keys.helper';
import { validateHeaders } from '../../../../../../shared/helpers/functions.helper';

@Component({
  selector: 'liaison-upload-duty',
  standalone: true,
  imports: [AsyncPipe, ToastModule, LoaderModalComponent, CommonModule],
  templateUrl: './upload-duty.component.html',
  styleUrl: './upload-duty.component.scss',
  providers: [MessageService],
})
export class UploadDutyComponent implements OnDestroy {
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
        'Date Commenced',
        'Place of Internship',
        'Start date',
        'End date',
        'Semester',
        'Company Name',
        'Company Phone',
        'Company Exact Location',
        'Company Town',
        'Company Region',
        'Company Address',
        'Company Email',
        'Company Supervisor',
        'Supervisor Phone',
        'Letter To',
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
      await this.dataService.sendFileToBackend(this.selectedFile()!),
    onSuccess: (response) => {
      client.invalidateQueries({ queryKey: attachmentsQueryKey.all });
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
        this._router.navigate(['/admin/attachment']).then();
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
