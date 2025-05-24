import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans"; // Updated Geist import
import { GeistMono } from "geist/font/mono"; // Updated Geist import
import "../globals.css"; // Corrected path to globals.css

import LayoutComponent from '@/components/layout/Layout'; // Renamed to avoid conflict with this Layout function
import { ThemeProvider } from "@/components/theme-provider";

// For i18n
import I18nProvider from '@/components/i18n-provider';
import initTranslations from '@/lib/i18n';
import i18nextConfig from '../../../next-i18next.config'; // Adjust path to root

// If globals.css is not found, it might need to be moved to src/ or its path adjusted.
// For now, assuming it's accessible. If not, I'll create a symlink or move it.

export const metadata: Metadata = {
  title: "Admin Dashboard", // Updated default title
  description: "Admin dashboard with Next.js, Shadcn/UI, and i18n",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

// Define the default namespaces to load for the layout
const i18nNamespaces = ['common'];

export default async function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <I18nProvider
          locale={locale}
          namespaces={i18nNamespaces}
          resources={resources}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LayoutComponent>{children}</LayoutComponent>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}

// Function to generate static params for locales
export async function generateStaticParams() {
  return i18nextConfig.i18n.locales.map((locale) => ({ locale }));
}
