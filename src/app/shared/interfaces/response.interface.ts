import { IUser } from "./user.interface";

export interface ICommonResponse {
    status: number;
    message: string;
}

export interface IGetStudentResponse extends ICommonResponse {
  data: IStudentResponseData;
}

interface IStudentResponseData {
  currentPage: number | undefined;
  pageSize: number | undefined;
  students: IStudentData[];
  totalData: number ;
  totalPages: number | undefined;
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
  status: 'IN_PROGRESS' | 'COMPLETED'
}

export interface IGetLecturersResponse extends ICommonResponse {
  data: ILecturersResponseData;
}

interface ILecturersResponseData {
  currentPage: number | undefined;
  pageSize: number | undefined;
  page: ILecturerContentData;
  totalData: number;
  totalPages: number | undefined;
}

interface ILecturerContentData {
  content: ILecturersData[];
}

export interface ILecturersData extends IUser {
  dp: string;
  department: string;
  faculty: string;
}
