export interface IUserLocation {
  longitude: number;
  latitude: number;
  message?: string;
}


export interface IStudentCompanyMapping {
  studentDetails: {
    id: string;
    name: string;
    email: string;
    phone: string;
    isSupervised: boolean;
    isAssumeDuty: boolean;
  };
  companyDetails: {
    name: string;
    email: string;
    phone: string;
    region: string;
    exactLocation: string;
  };
  lat: string;
  lng: string;
}
