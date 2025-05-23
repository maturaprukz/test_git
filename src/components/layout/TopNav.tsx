"use client";

import React from 'react';
import { useTheme } from "next-themes";
import { useTranslation } from 'react-i18next';
import { useRouter, usePathname } from 'next/navigation'; // For language switcher
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Moon, Sun, Menu as MenuIconLucide, Bell as BellIconLucide, UserCircle2 as UserCircleIconLucide, Search as SearchIconLucide, Languages } from "lucide-react";
import i18nextConfig from '../../../next-i18next.config'; // For available locales

interface TopNavProps {
  setIsMobileSheetOpen: (open: boolean) => void;
}

export default function TopNav({ setIsMobileSheetOpen }: TopNavProps) {
  const { t } = useTranslation('common');
  const { setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (newLocale: string) => {
    // Remove current locale from pathname
    const currentLocale = i18nextConfig.i18n.locales.find(loc => pathname.startsWith(`/${loc}`));
    let newPath = pathname;
    if (currentLocale) {
      newPath = pathname.substring(currentLocale.length + 1); // +1 for the slash
    }
    if (newPath.startsWith('/')) newPath = newPath.substring(1); // ensure no double slash
    
    router.push(`/${newLocale}/${newPath}`);
  };

  return (
    <header className="bg-card text-card-foreground shadow-sm p-4 flex justify-between items-center h-16 flex-shrink-0 border-b">
      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileSheetOpen(true)}
          className="md:hidden mr-3"
          aria-label="Open sidebar"
        >
          <MenuIconLucide className="h-5 w-5" />
        </Button>

        <div className="relative hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIconLucide className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder={t('search') + '...'} // Translated placeholder
            className="block w-40 sm:w-56 md:w-64 lg:w-full pl-10 pr-3 py-2 border border-input bg-transparent rounded-md leading-5 placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring sm:text-sm h-9" // Adjusted width classes
          />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Language Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Languages className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Change language</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t('settings_label_language')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {i18nextConfig.i18n.locales.map((locale) => (
              <DropdownMenuItem key={locale} onClick={() => changeLanguage(locale)}>
                {locale.toUpperCase()} ({locale === 'en' ? 'English' : 'ไทย'})
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>{t('theme_switcher_light')}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>{t('theme_switcher_dark')}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>{t('theme_switcher_system')}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" aria-label="View notifications">
          <BellIconLucide className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full w-8 h-8 p-0">
               <UserCircleIconLucide className="h-7 w-7 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>{t('settings_profile_title')}</DropdownMenuItem> 
            <DropdownMenuItem>{t('sidebar_settings')}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem> {/* "Sign out" needs translation key */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

// Need to import Input if it's not already (it was in previous version of TopNav)
import { Input } from "@/components/ui/input";
