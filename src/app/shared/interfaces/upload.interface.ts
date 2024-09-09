export interface uploadResponse{
  message:string,
  status: number
}


export interface getStudentResponse{
  data:studentData[],
  status: number
  message: string
}


export interface studentData {
  age: string
  course: string
  department: string
  email: string
  endDate: string
  faculty: string
  gender: string
  id: string
  name: string
  phone: string
  placeOfInternship: string
  startDate: string
}
