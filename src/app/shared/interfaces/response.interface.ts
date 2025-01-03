import { IUser, TRole } from './user.interface';
import { IStudentCompanyMapping } from './location.interface';

export interface ICommonResponse {
  status: number;
  message: string;
}

interface IPagableResponse {
  currentPage: number;
  pageSize: number;
  totalData: number;
  totalPages: number;
}

export interface IGetStudentForLecturerData {
  id: string;
  name: string;
  department: string;
  faculty: string;
  age: string;
  email: string;
  gender: string;
  phone: string;
  course: string;
  placeOfInternship: string;
  isSupervised: boolean;
  isAssumeDuty: boolean;
  startDate: string;
  endDate: string;
  status: string;
  town: string;
  student_id: string;
}
export interface IGetStudentForLecturer extends ICommonResponse {
  data: {
    student: {
      students: IGetStudentForLecturerData[];
      totalStudents: number;
    };
    company: {
      companies: {};
      totalCompanies: number;
    };
    lecturer: {
      lecturers: string[];
      totalLecturers: number;
    };
  };
}

export interface IGetStudentResponse extends ICommonResponse {
  data: IStudentResponseData;
}

interface IStudentResponseData extends IPagableResponse {
  students: IStudentData[];
}

export interface IStudentData extends IUser {
  age: string;
  course: string;
  department: string;
  endDate: string;
  faculty: string;
  gender: string;
  name: string;
  placeOfInternship: string;
  startDate: string;
  status: 'IN_PROGRESS' | 'COMPLETED';
}

export interface IGetLecturersResponse extends ICommonResponse {
  data: ILecturersResponseData;
}

interface ILecturersResponseData extends IPagableResponse {
  page: ILecturerContentData;
}

interface ILecturerContentData {
  content: ILecturersData[];
}

export interface ILecturersData extends IUser {
  dp: string;
  department: string;
  faculty: string;
  lecturerId: string;
}

export interface IColleagueData {
  id: string;
  name: string;
  email: string;
  department: string;
}

export interface IStartAnalytics {
  lectures: number;
  students: number;
  internships: number;
}

export interface IStatAnalytics {
  totalColleagues: number;
  totalLecturers: number;
  internships: number;
}

export interface CompanyDetails {
  companyAddress: string;
  companyEmail: string;
  companyExactLocation: string;
  companyName: string;
  companyPhone: string;
  companyRegion: string;
  companySupervisor: string;
  companyTown: string;
  letterTo: string;
  supervisorPhone: string;
  dateCommenced: string;
}

export interface DutyData {
  id: string;
  studentId: string;
  dateCreated: string;
  dateUpdated: string;
  dateCommenced: string;
  startOfAcademicYear: string;
  endOfAcademicYear: string;
  companyDetails: CompanyDetails;
  internship: boolean;
  updated: boolean;
}

export interface UpdatedDutiesResponse extends ICommonResponse {
  data: DutyData[];
}


export interface AssumptionOfDutyData {
  oldAssumptionOfDuties: DutyData[];
  updatedAssumptionOfDuty: DutyData;
}

export interface AssumptionOfDutyDetailsResponse extends ICommonResponse {
  data: AssumptionOfDutyData;
}


export interface IStatAnalyticsResponse extends ICommonResponse {
  data: IStartAnalytics;
}

export interface IStudentCompanyMappingResponse extends ICommonResponse {
  data: IStudentCompanyMapping[];
}

export interface ILecturerDashboard {
  student: {
    students: any[];
    totalStudents: number;
  };
  company: {
    companies: Record<string, any>;
    totalCompanies: number;
  };
  lecturer: {
    lecturers: string[];
    totalLecturers: number;
  };
}

export interface ILecturerDashboardResponse extends ICommonResponse {
  data: ILecturerDashboard;
}

export interface AssignedStudentsData {
  assignedStudents: IStudentData[];
  count: number;
}

export interface UnassignedStudentsData {
  unAssignedStudents: IStudentData[];
  count: number;
}

export interface AssignedLecturerData {
  assignedLecturers: IStudentData[];
  count: number;
}

export interface UnassignedLecturerData {
  unAssignedLecturers: IStudentData[];
  count: number;
}

export interface IStudentChartData {
  assignedStudents: AssignedStudentsData;
  unassignedStudents: UnassignedStudentsData;
}

export interface ILecturerChartData {
  assignedLecturers: AssignedLecturerData;
  unAssignedLecturers: UnassignedLecturerData;
}

export interface IAssignedStudentsGroup {
  assignedStudents: AssignedStudentsData[];
  count: number;
}

export interface IUnassignedStudentsGroup {
  unAssignedStudents: UnassignedStudentsData[];
  count: number;
}

export interface IAssignedLecturersGroup {
  assignedLecturers: AssignedLecturerData[];
  count: number;
}

export interface IUnassignedLecturersGroup {
  unAssignedLecturers: UnassignedLecturerData[];
  count: number;
}

export interface IAssignedAndUnassignedStudents {
  assignedStudents: IAssignedStudentsGroup;
  unassignedStudents: IUnassignedStudentsGroup;
  totalStudents: number;
}

export interface IAssignedAndUnassignedLecturers {
  assignedLecturers: IAssignedLecturersGroup;
  unassignedLecturers: IUnassignedLecturersGroup;
  totalLecturers: number;
}

export interface StudentAndLecturerChartResponse extends ICommonResponse {
  data: {
    assignedAndUnassignedStudents: IAssignedAndUnassignedStudents;
    assignedAndUnassignedLecturers: IAssignedAndUnassignedLecturers;
  };
}

export interface IFacultyAnalytics extends ICommonResponse {
  data: {
    facultyData: {
      name: string;
      totalStudents: number; 
    }[];
    totalStudents: number; 
  };
}

export interface ILecturer {
  id: string;
  lecturerId: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  otherName?: string;
  email: string;
  phone: string;
  company: string;
  password: string;
  faculty: string;
  department: string;
  semester: number;
  role: TRole;
  zoneLead: boolean;
}

export interface IZone {
  id: string;
  name: string;
  region: string;
  zoneLead: string;
  startOfAcademicYear: string;
  endOfAcademicYear: string;
  dateCreated: string;
  dateUpdated: string;
  internshipType: 'INTERNSHIP' | string;
  lecturers: {
    lecturers: ILecturer[];
    totalLecturers: number;
  };
  towns: string[];
  totalLecturers: number;
}

export interface ZoneResponse extends ICommonResponse {
  data: IZone[]
}

export interface SingleZoneResponse extends ICommonResponse {
  data: IZone;
}