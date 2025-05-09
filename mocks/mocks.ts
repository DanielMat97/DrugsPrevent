import { Alert, Contact, User } from '../types';

// Mock user data
export const mockUser: User = {
  id: '1',
  name: 'Usuario Demo',
  email: 'usuario@ejemplo.com',
};

// Mock alerts data
export const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'Posible consumo de cannabis',
    description: 'Juan fue visto con comportamiento errático y olor característico a marihuana en la zona común.',
    date: '2023-10-15T14:30:00Z',
    level: 'medium',
  },
  {
    id: '2',
    title: 'Sustancia desconocida encontrada',
    description: 'Se encontró una sustancia en polvo blanco en el baño del segundo piso.',
    date: '2023-10-12T09:15:00Z',
    level: 'high',
  },
  {
    id: '3',
    title: 'Posible consumo de alcohol',
    description: 'Carlos presentó signos de embriaguez durante las actividades de la tarde.',
    date: '2023-10-10T18:45:00Z',
    level: 'low',
  },
  {
    id: '4',
    title: 'Alerta por pastillas',
    description: 'Se reportó la circulación de pastillas sin etiqueta entre algunos estudiantes.',
    date: '2023-10-05T11:20:00Z',
    level: 'high',
  },
];

// Mock contacts data
export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Instituto Colombiano de Bienestar Familiar (ICBF)',
    description: 'Entidad del Estado colombiano que trabaja por la prevención y protección integral de los niños, niñas y adolescentes.',
    phone: '+5716015000',
    email: 'atencionalciudadano@icbf.gov.co',
  },
  {
    id: '2',
    name: 'Línea Nacional de Drogas',
    description: 'Línea de atención para consultas sobre prevención y tratamiento de adicciones.',
    phone: '+573219089841',
    email: 'info@nuevosrumbos.org',
  },
  {
    id: '3',
    name: 'Ministerio de Salud - Programa de Prevención',
    description: 'Programa de prevención de consumo de sustancias psicoactivas del Ministerio de Salud.',
    phone: '+5713305000',
    email: 'atencionalciudadano@minsalud.gov.co',
  },
  {
    id: '4',
    name: 'Centro de Atención a Drogodependencias',
    description: 'Entidad especializada en el tratamiento y rehabilitación de personas con problemas de adicción.',
    phone: '+5712347890',
    email: 'contacto@centroatencion.gov.co',
  },
];

// Generate mock token
export const generateMockToken = (): string => {
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlVzdWFyaW8gRGVtbyIsImlhdCI6MTUxNjIzOTAyMn0.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o';
}; 