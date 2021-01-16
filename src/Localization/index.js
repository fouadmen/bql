import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {getLocales} from 'react-native-localize';
import ar from "./locales/ar";
import fr from "./locales/fr";

i18n.use(initReactI18next)
    .init({
        lng: 'ar',//getLocales()[0].languageCode,
        fallbackLng: 'ar',
        resources: { ar, fr},
        // have a common namespace used around the full app
        ns: ['common','categories','screens', 'products'],
        defaultNS: 'common',

        debug: true,
        interpolation: {
        escapeValue: false,
        },
    });

export default i18n;