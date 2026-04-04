import type { DaySchedule } from '../types';

export const businessInfo = {
  name: 'La Trattoria',
  tagline: "Cucina tradizionale d'Italia",
  tagline2: "L'autentico sapore italiano",
  email: 'latrattoriapereira@gmail.com',
  phone: '+573152009121',
  whatsappUrl: 'https://wa.me/573152009121',
  whatsappDisplay: '+57 315 200 9121',
  address: 'Cra. 17 Bis #21 BIS -04 local 2, Pereira',
  city: 'Pereira',
  instagram: 'https://www.instagram.com/latrattoriapereira/',
  instagramHandle: '@latrattoriapereira',
  facebook: 'https://web.facebook.com/latrattoriapereira/',
  facebookHandle: 'latrattoriapereira',
  tripadvisor: 'https://www.tripadvisor.co/UserReviewEdit-g297479-d6529436-La_Trattoria-Pereira_Risaralda_Department.html',
  googleReviews: 'https://www.google.com/maps/place/La+Trattor%C3%ADa+La+Era+%7C+Comida+Italiana+y+Carne+a+la+Piedra+Pereira,+La+Lorena/@4.805883,-75.6973936,17z/data=!3m1!4b1!4m6!3m5!1s0x8e388743c5317b79:0xe263c52b89eb43ca!8m2!3d4.805883!4d-75.6973936!16s%2Fg%2F11cnm624qx?entry=ttu',
  googleMaps: 'https://www.google.com/maps/place/La+Trattor%C3%ADa+La+Era+%7C+Comida+Italiana+y+Carne+a+la+Piedra+Pereira,+La+Lorena/@4.805883,-75.6973936,17z/data=!3m1!4b1!4m6!3m5!1s0x8e388743c5317b79:0xe263c52b89eb43ca!8m2!3d4.805883!4d-75.6973936!16s%2Fg%2F11cnm624qx?entry=ttu',
  waze: 'https://waze.com/ul?ll=4.805883,-75.6973936&navigate=yes',
  appleMaps: 'https://maps.apple.com/?q=La+Trattoria&ll=4.805883,-75.6973936',
  coordinates: { lat: 4.805883, lng: -75.6973936 },
};

export const businessHours: Record<string, DaySchedule> = {
  monday: {
    regular: { open: '12:00', close: '22:00' },
    holiday: { open: '12:00', close: '17:00' },
  },
  tuesday: {
    regular: { open: '12:00', close: '22:00' },
    holiday: { open: '12:00', close: '21:00' },
  },
  wednesday: {
    regular: { open: '12:00', close: '22:00' },
    holiday: { open: '12:00', close: '21:00' },
  },
  thursday: {
    regular: { open: '12:00', close: '22:00' },
    holiday: { open: '12:00', close: '21:00' },
  },
  friday: {
    regular: { open: '12:00', close: '23:00' },
    holiday: { open: '12:00', close: '21:00' },
  },
  saturday: {
    regular: { open: '12:00', close: '23:00' },
    holiday: null,
  },
  sunday: {
    regular: { open: '12:00', close: '17:00' },
    holiday: null,
  },
};

export const dayNames = {
  es: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
  it: ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'],
  en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
};

export const dayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
