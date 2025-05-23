import { createInstance, i18n as I18nInstanceType } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import i18nextConfig from '../../next-i18next.config'; // Adjust path if needed

const { i18n: { defaultLocale, locales } } = i18nextConfig;

const initTranslations = async (
  locale: string,
  namespaces: string[],
  i18nInstance?: I18nInstanceType,
  resources?: any // For client-side pass-through
) => {
  const instance = i18nInstance || createInstance();

  instance.use(initReactI18next);

  if (!resources) { // Only use backend if resources aren't preloaded (e.g., on client)
    instance.use(LanguageDetector); // Detect language on client
    instance.use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`../../public/locales/${language}/${namespace}.json`)
      )
    );
  }

  await instance.init({
    lng: locale,
    resources, // Use preloaded resources if available
    fallbackLng: defaultLocale,
    supportedLngs: locales,
    defaultNS: namespaces[0] || 'common',
    ns: namespaces,
    preload: resources ? [] : locales, // Preload all languages if not using preloaded resources
    // debug: process.env.NODE_ENV === 'development', // Optional
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
    react: {
      useSuspense: false, // Important for App Router to avoid issues
    },
  });

  return {
    i18n: instance,
    resources: instance.services.resourceStore.data, // Pass resources back for client hydration
    t: instance.t,
  };
};

export default initTranslations;

// Helper function to use translations in Server Components
export async function getTranslations(
  locale: string,
  namespaces: string[] = ['common'],
  options: { keyPrefix?: string } = {}
) {
  const { t, i18n } = await initTranslations(locale, namespaces);
  return { t: (key: string) => t(key, { ...options }), i18n };
}
