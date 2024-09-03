import {Component, inject} from '@angular/core';
import * as XLSX from 'xlsx';
import {DataService} from "../../service/Data/data.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'liaison-upload',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  dataService = inject(DataService)
  selectedFileName!:string ;

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const binaryString: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(binaryString, { type: 'binary' });

      // Assuming the data is in the first sheet
      const sheetName: string = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

      // Parse the data as JSON
      const data: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Validate headers
      const expectedHeaders = [
        'Registration number', 'Name', 'Programme', 'Year of study',
        'Telephone number', 'Company\'s name', 'Company\'s address',
        'Company\'s phone no', 'Company\'s email', 'Company Exact Location',
        'Company Supervisor', 'Supervisor phoneNo', 'Company Zone'
      ];

      const fileHeaders = data[0];

      if (JSON.stringify(fileHeaders) !== JSON.stringify(expectedHeaders)) {
        alert('Excel headers do not match expected format.');
        return;
      }

      // Process the rest of the data
      const students = data.slice(1).map(row => ({
        id: row[0],
        name: row[1],
        programme: row[2],
        yearOfStudy: row[3],
        telephoneNumber: row[4],
        companyName: row[5],
        companyAddress: row[6],
        companyPhoneNo: row[7],
        companyEmail: row[8],
        companyExactLocation: row[9],
        companySupervisor: row[10],
        supervisorPhoneNo: row[11],
        companyZone: row[12]
      }));

      // Save or use the student data as needed
      this.dataService.students = students;
    };

    reader.readAsBinaryString(target.files[0]);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.selectedFileName = file.name; // Update file name display
      const isValid = this.dataService.importData(file, 'students'); // Validate and import data

      if (isValid) {
        this.showTable();
      }
    }
  }

  showTable() {
    document.getElementById('dropZone')!.style.display = 'none';
    document.getElementById('tableArea')!.classList.remove('hidden');
    document.getElementById('fileDisplayArea')!.classList.remove('hidden');
  }

}
