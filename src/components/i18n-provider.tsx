"use client";

import { I18nextProvider } from 'react-i18next';
import { createInstance } from 'i18next';
import initTranslations from '@/lib/i18n'; // We'll create this utility next

interface I18nProviderProps {
  children: React.ReactNode;
  locale: string;
  namespaces: string[];
  resources: any; // Adjust type based on i18next resource structure
}

export default function I18nProvider({
  children,
  locale,
  namespaces,
  resources,
}: I18nProviderProps) {
  const i18n = createInstance();
  initTranslations(locale, namespaces, i18n, resources);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
