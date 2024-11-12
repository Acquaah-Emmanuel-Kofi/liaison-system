import { IUser } from './user.interface';

export interface ICommonResponse {
  status: number;
  message: string;
}

export interface IZones{
  dateCreated?: string
  dateUpdated?: string
  endOfAcademicYear?:string
  id?:string
  internshipType?:string
  lecturers?: string[]
  name?:string
  region?:string
  startOfAcademicYear?:string
  towns?: string[]
  zoneLead?:string
}

interface IPagableResponse {
  currentPage: number;
  pageSize: number;
  totalData: number;
  totalPages: number;
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

export interface IStartAnalytics {
  lectures: number;
  students: number;
  internships: number;
}
export interface IStatAnalyticsResponse extends ICommonResponse {
  data: IStartAnalytics;
}

