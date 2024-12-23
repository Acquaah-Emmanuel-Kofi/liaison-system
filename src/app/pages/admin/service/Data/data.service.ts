// data.service.ts
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  students: any[] = [];
  placements: any[] = [];
  assignments: { [studentId: string]: string } = {}; // studentId -> lecturerId

  // Required headers for students and placements
  private requiredStudentHeaders = ['Registration number', 'Name', 'Programme', 'Year of study', 'Telephone number', 'Company\'s name', 'Company\'s address', 'Company\'s phone no', 'Company\'s email', 'Company Exact Location', 'Company Supervisor', 'Supervisor phoneNo', 'Company Zone'];
  private requiredPlacementHeaders = ['Registration number', 'Name', 'Location'];

  importData(file: File, type: 'students' | 'placements'): boolean {
    const reader = new FileReader();
    // @ts-ignore
    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, {type: 'binary'});
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, {header: 1});

      // Validate headers based on the type
      const headers = jsonData[0];
      if (type === 'students' && !this.validateHeaders(headers, this.requiredStudentHeaders)) {
        alert('Invalid headers in student data');
        return false;
      } else if (type === 'placements' && !this.validateHeaders(headers, this.requiredPlacementHeaders)) {
        alert('Invalid headers in placement data');
        return false;
      }

      // Process the data if headers are valid
      if (type === 'students') {
        this.students = this.processStudentData(jsonData.slice(1)); // Remove header row
      } else if (type === 'placements') {
        this.placements = this.processPlacementData(jsonData.slice(1)); // Remove header row
      }
    };
    reader.readAsBinaryString(file);
    return true;
  }

  private validateHeaders(headers: unknown, requiredHeaders: string[]): boolean {
    // @ts-ignore
    return requiredHeaders.every(header => headers.includes(header));
  }

  processStudentData(data: any[]): any[] {
    return data.map((row: any, index: number) => ({
      id: row[0],
      name: row[1],
      email: row[2],
      program: row[3],
      valid: this.validateStudent(row),
      rowNumber: index + 1
    }));
  }

  processPlacementData(data: any[]): any[] {
    return data.map((row: any, index: number) => ({
      id: row[0],
      companyName: row[1],
      location: row[2],
      valid: this.validatePlacement(row),
      rowNumber: index + 1
    }));
  }

  validateStudent(row: any): boolean {
    return !!(row[0] && row[1] && row[2] && row[3]);
  }

  validatePlacement(row: any): boolean {
    return !!(row[0] && row[1] && row[2]);
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
