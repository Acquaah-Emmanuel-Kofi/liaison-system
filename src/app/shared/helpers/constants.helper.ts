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
  'students/location': 'Students Location',
  internships: 'Internships',
  profile: 'Edit Profile',
  'access-control': 'Access Control',
  courses: 'Courses',
  location: 'Location',
  zones: 'Zones',
  'assumption-of-duty': 'Assumption of Duty',
};

export function setPageHeader(currentRoute: string): string {
  // Sort the keys by length in descending order to match more specific routes first
  const sortedKeys = Object.keys(routeValueKey).sort(
    (a, b) => b.length - a.length
  );

  for (const key of sortedKeys) {
    if (currentRoute.includes(key)) {
      return routeValueKey[key];
    }
  }

  return '';
}

export const facultiesAndDepartments = {
  'Applied Arts and Technology': [
    {
      name: 'Graphic Design Technology',
      value: 'graphic-design',
    },
    { name: 'Ceramics Technology', value: 'ceramics' },
    {
      name: 'Sculpture and Industrial Crafts',
      value: 'sculpture-industrial',
    },
    {
      name: 'Industrial Painting and Design',
      value: 'painting-design',
    },
    {
      name: 'Textile Design and Technology',
      value: 'textile-design',
    },
    {
      name: 'Fashion Design and Technology',
      value: 'fashion-design',
    },
  ],
  'Applied Sciences': [
    {
      name: 'Hospitality Management',
      value: 'hospitality-management',
    },
    { name: 'Tourism Management', value: 'tourism-management' },
    {
      name: 'Mathematics, Statistics and Actuarial Science',
      value: 'math-statistics',
    },
    { name: 'Computer Science', value: 'computer-science' },
  ],
  'Business Studies': [
    {
      name: 'Accounting and Finance',
      value: 'accounting-finance',
    },
    {
      name: 'Procurement and Supply',
      value: 'procurement-supply',
    },
    {
      name: 'Marketing and Strategy',
      value: 'marketing-strategy',
    },
    {
      name: 'Secretaryship and Management Studies',
      value: 'secretaryship-management',
    },
    {
      name: 'Professional Studies',
      value: 'professional-studies',
    },
  ],
  'Built and Natural Environment': [
    {
      name: 'Building Technology',
      value: 'building-technology',
    },
    {
      name: 'Interior Design Technology',
      value: 'interior-design',
    },
    { name: 'Estate Management', value: 'estate-management' },
  ],
  'Engineering': [
    { name: 'Civil Engineering', value: 'civil-engineering' },
    {
      name: 'Electricals/ Electronics Engineering',
      value: 'electrical-electronics',
    },
    {
      name: 'Mechanical Engineering',
      value: 'mechanical-engineering',
    },
    { name: 'Oil & Natural Gas', value: 'oil-natural-gas' },
    {
      name: 'Renewable Energy Engineering',
      value: 'renewable-energy',
    },
  ],
  'Health and Allied Sciences': [
    {
      name: 'Biomedical Engineering',
      value: 'biomedical-engineering',
    },
    {
      name: 'Medical Laboratory Technology',
      value: 'medical-lab-tech',
    },
    {
      name: 'Medical Laboratory Science',
      value: 'medical-lab-science',
    },
    {
      name: 'Medical Imaging Technology',
      value: 'medical-imaging',
    },
    {
      name: 'Pharmacy Technology',
      value: 'pharmacy-technology',
    },
  ],
  'Maritime and Nautical Studies': [
    { name: 'Marine Engineering', value: 'marine-engineering' },
    { name: 'Nautical Studies', value: 'nautical-studies' },
    { name: 'Maritime Transport', value: 'maritime-transport' },
  ],
};
