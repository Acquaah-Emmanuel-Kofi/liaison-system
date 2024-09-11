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
  totalData: number | undefined;
  totalPages: number | undefined;
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
