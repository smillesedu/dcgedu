import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Importando traduções
import translationPT from "./locales/pt/translation.json";
import translationEN from "./locales/en/translation.json";
import translationFR from "./locales/fr/translation.json";
import translationES from "./locales/es/translation.json";
import translationDE from "./locales/de/translation.json";

const resources = {
  pt: { translation: translationPT },
  en: { translation: translationEN },
  fr: { translation: translationFR },
  es: { translation: translationES },
  de: { translation: translationDE }
};

i18n
  .use(LanguageDetector) // Detecta idioma do navegador
  .use(initReactI18next) // Faz integração com React
  .init({
    resources,
    fallbackLng: "en", // Caso não encontre tradução, usa inglês
    interpolation: { escapeValue: false }
  });

export default i18n;
