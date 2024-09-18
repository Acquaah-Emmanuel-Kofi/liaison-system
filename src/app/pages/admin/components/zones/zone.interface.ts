export interface  lectureListModule{
  data : lectureListResponse []
  message: string,
  status : number
}

export interface lectureListResponse{
  "id": string,
  "name": string,
  "dp": string
}



