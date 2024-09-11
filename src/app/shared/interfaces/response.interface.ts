export interface ICommonResponse {
    status: number;
    message: string;
}

export interface IGetStudentResponse extends ICommonResponse {
  data: IStudentResponseData;
}

interface IStudentResponseData {
  currentPage: number;
  pageSize: number;
  students: IStudentData[];
  totalData: number;
  totalPages: number;
}

export interface IStudentData {
  age: string;
  course: string;
  department: string;
  email: string;
  endDate: string;
  faculty: string;
  gender: string;
  id: string;
  name: string;
  phone: string;
  placeOfInternship: string;
  startDate: string;
  status: 'IN_PROGRESS' | 'COMPLETED'
}