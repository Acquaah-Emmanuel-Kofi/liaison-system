export interface ICommonResponse {
    status: number;
    message: string;
}

export interface IGetStudentResponse extends ICommonResponse {
  data: IStudentData[];
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
}