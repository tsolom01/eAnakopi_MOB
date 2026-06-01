import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';


import en from './locales/en.json';
import gr from './locales/gr.json';



i18next
    .use(initReactI18next)        // Bind i18next to React
    .init({
        fallbackLng: 'en',
        resources: {
            en: { translation: en },
            gr: { translation: gr },
        },
        interpolation: {
            escapeValue: false, // React handles escaping
        },
    });

export  default  i18next;

