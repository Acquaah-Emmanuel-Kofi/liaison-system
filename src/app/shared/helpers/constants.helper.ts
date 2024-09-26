export const ACCESS_TOKEN_KEY: string = 'LIAISON_SYSTEM_TOKEN';

export const saveToLocalStorage = (key: string, value: any) => {
  return localStorage.setItem(key, value);
};

export const getFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

export const removeFromLocalStorage = (key: string) => {
  return localStorage.removeItem(key);
};

const routeValueKey: { [key: string]: string } = {
  dashboard: 'Dashboard',
  lecturers: 'Lecturers',
  students: 'Students',
  internships: 'Internships',
  'access-control': 'Access Control',
  courses: 'Courses',
  location: 'Location',
  annoucements: 'Annoucements',
  zones: 'Zones',
};

export function setPageHeader(currentRoute: string): string {
  for (const key in routeValueKey) {
    if (currentRoute.includes(key)) {
      return routeValueKey[key];
    }
  }
  return '';
}

export const facultiesAndDepartments = {
  'Faculty of Applied Arts and Technology': [
    {
      name: 'Department of Graphic Design Technology',
      value: 'graphic-design',
    },
    { name: 'Department of Ceramics Technology', value: 'ceramics' },
    {
      name: 'Department of Sculpture and Industrial Crafts',
      value: 'sculpture-industrial',
    },
    {
      name: 'Department of Industrial Painting and Design',
      value: 'painting-design',
    },
    {
      name: 'Department of Textile Design and Technology',
      value: 'textile-design',
    },
    {
      name: 'Department of Fashion Design and Technology',
      value: 'fashion-design',
    },
  ],
  'Faculty of Applied Sciences': [
    {
      name: 'Department of Hospitality Management',
      value: 'hospitality-management',
    },
    { name: 'Department of Tourism Management', value: 'tourism-management' },
    {
      name: 'Department of Mathematics, Statistics and Actuarial Science',
      value: 'math-statistics',
    },
    { name: 'Department of Computer Science', value: 'computer-science' },
  ],
  'Faculty of Business Studies': [
    {
      name: 'Department of Accounting and Finance',
      value: 'accounting-finance',
    },
    {
      name: 'Department of Procurement and Supply',
      value: 'procurement-supply',
    },
    {
      name: 'Department of Marketing and Strategy',
      value: 'marketing-strategy',
    },
    {
      name: 'Department of Secretaryship and Management Studies',
      value: 'secretaryship-management',
    },
    {
      name: 'Department of Professional Studies',
      value: 'professional-studies',
    },
  ],
  'Faculty of Built and Natural Environment': [
    {
      name: 'Department of Building Technology',
      value: 'building-technology',
    },
    {
      name: 'Department of Interior Design Technology',
      value: 'interior-design',
    },
    { name: 'Department of Estate Management', value: 'estate-management' },
  ],
  'Faculty of Engineering': [
    { name: 'Department of Civil Engineering', value: 'civil-engineering' },
    {
      name: 'Department of Electricals/ Electronics Engineering',
      value: 'electrical-electronics',
    },
    {
      name: 'Department of Mechanical Engineering',
      value: 'mechanical-engineering',
    },
    { name: 'Department of Oil & Natural Gas', value: 'oil-natural-gas' },
    {
      name: 'Department of Renewable Energy Engineering',
      value: 'renewable-energy',
    },
  ],
  'Faculty of Health and Allied Sciences': [
    {
      name: 'Department of Biomedical Engineering',
      value: 'biomedical-engineering',
    },
    {
      name: 'Department of Medical Laboratory Technology',
      value: 'medical-lab-tech',
    },
    {
      name: 'Department of Medical Laboratory Science',
      value: 'medical-lab-science',
    },
    {
      name: 'Department of Medical Imaging Technology',
      value: 'medical-imaging',
    },
    {
      name: 'Department of Pharmacy Technology',
      value: 'pharmacy-technology',
    },
  ],
  'Faculty of Maritime and Nautical Studies': [
    { name: 'Department of Marine Engineering', value: 'marine-engineering' },
    { name: 'Department of Nautical Studies', value: 'nautical-studies' },
    { name: 'Department of Maritime Transport', value: 'maritime-transport' },
  ],
};
