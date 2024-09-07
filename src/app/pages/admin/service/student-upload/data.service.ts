import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  students: any[] = [];
  placements: any[] = [];
  assignments: { [studentId: string]: string } = {}; // studentId -> lecturerId
  headers: string[] = []; // Store dynamic headers

  importData(file: File, type: 'students' | 'placements'): boolean {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Extract headers dynamically from the file
      // @ts-ignore
      this.headers = jsonData[0].map((header: string) => header.trim());
      if (type === 'students') {
        this.students = this.processStudentData(jsonData.slice(1)); // Remove header row
      } else if (type === 'placements') {
        this.placements = this.processPlacementData(jsonData.slice(1)); // Remove header row
      }
    };

    reader.readAsBinaryString(file);
    return true;
  }

  processStudentData(data: any[]): any[] {
    return data.map((row: any) => {
      const student = this.headers.reduce((obj: any, header: string, index: number) => {
        obj[header] = row[index] || '';
        return obj;
      }, {});
      student.valid = this.validateStudent(row);
      return student;
    });
  }

  processPlacementData(data: any[]): any[] {
    return data.map((row: any) => {
      const placement = this.headers.reduce((obj: any, header: string, index: number) => {
        obj[header] = row[index] || '';
        return obj;
      }, {});
      placement.valid = this.validatePlacement(row);
      return placement;
    });
  }

  validateStudent(row: any): boolean {
    return !!(row[0] && row[1] && row[2] && row[3]);
  }

  validatePlacement(row: any): boolean {
    return !!(row[0] && row[1] && row[2]);
  }
  sendFileToBackend(file: File, type: 'students') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    console.log(formData)

  }

  assignLecturer(studentId: string, lecturerId: string) {
    this.assignments[studentId] = lecturerId;
  }

  getAssignment(lecturerId: string) {
    return Object.entries(this.assignments)
      .filter(([_, assignedLecturerId]) => assignedLecturerId === lecturerId)
      .map(([studentId]) => this.students.find(student => student.id === studentId));
  }

  getStatistics() {
    return {
      totalStudents: this.students.length,
      totalPlacements: this.placements.length,
      totalAssignments: Object.keys(this.assignments).length
    };
  }
}
