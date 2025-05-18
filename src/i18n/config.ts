'use client';

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import zhTranslation from "./translations/zh.json";
import enTranslation from "./translations/en.json";

i18n.use(initReactI18next)
    .init({
        resources: {
            zh: { translation: zhTranslation },
            en: { translation: enTranslation }
        },
        lng: 'zh',
        fallbackLng: 'zh',
        interpolation: {
            escapeValue: false,
        }
    })

export default i18n;