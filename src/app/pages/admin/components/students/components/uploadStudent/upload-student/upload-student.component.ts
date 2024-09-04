import { Component, inject } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";
import { DataService } from "../../../../../service/student-upload/data.service";
import * as XLSX from "xlsx";

@Component({
  selector: 'liaison-upload-student',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './upload-student.component.html',
  styleUrls: ['./upload-student.component.scss']
})
export class UploadStudentComponent {
  dataService = inject(DataService);
  selectedFileName!: string;

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      alert('Please select only one file.');
      return;
    }

    const file: File = target.files[0];
    this.selectedFileName = file.name; // Update file name display
    this.processFile(file);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.selectedFileName = file.name; // Update file name display
      this.processFile(file);
    }
  }

  processFile(file: File) {
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const binaryString: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(binaryString, { type: 'binary' });

      // Read data from the first sheet
      const sheetName: string = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

      // Convert sheet to JSON format
      const data: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Extract headers dynamically from the first row
      const fileHeaders = data[0].map((header: string) => header.trim());
      this.dataService.headers = fileHeaders;

      // Validate headers
      const expectedHeaders = [
        'Student ID', 'Name', 'Faculty', 'Department', 'Age', 'Gender', 'About',
        'Password', 'Course', 'Email', 'Telephone number',
      ];

      if (JSON.stringify(fileHeaders) !== JSON.stringify(expectedHeaders)) {
        alert('Excel headers do not match expected format.');
        return;
      }

      // Process and store the data using the data service
      const students = data.slice(1).map((row: any) => {
        const student: any = {};
        fileHeaders.forEach((header: string, index: number) => {
          student[header] = row[index] || ''; // Assign data to respective header
        });
        return student;
      });

      this.dataService.students = students;
      this.showTable();
    };

    reader.readAsBinaryString(file);
  }

  showTable() {
    document.getElementById('dropZone')!.style.display = 'none';
    document.getElementById('tableArea')!.classList.remove('hidden');
    document.getElementById('fileDisplayArea')!.classList.remove('hidden');
  }
}
