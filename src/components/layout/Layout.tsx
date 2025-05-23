"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import { useTheme } from 'next-themes';
import { themeColorOptions, defaultColorName, applyThemeColors } from '@/lib/theme-colors'; // Import theme color utilities

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
  const { theme: currentThemeMode, systemTheme } = useTheme(); // 'theme' is light/dark/system

  const toggleDesktopSidebar = () => {
    setIsDesktopSidebarOpen(!isDesktopSidebarOpen);
  };

  // Effect to apply the persisted primary color and manage documentElement.classList for dark/light
  useEffect(() => {
    const actualThemeMode = currentThemeMode === 'system' 
      ? (systemTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) 
      : currentThemeMode || 'light';

    // Apply dark/light class to HTML element (for Tailwind's dark: selector)
    if (actualThemeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Apply persisted primary color
    const storedColorName = typeof window !== 'undefined' 
      ? localStorage.getItem('selectedPrimaryColor') || defaultColorName 
      : defaultColorName;
      
    const selectedColorOption = themeColorOptions.find(opt => opt.name === storedColorName) ||
                               themeColorOptions.find(opt => opt.name === defaultColorName);

    if (selectedColorOption) {
      applyThemeColors(selectedColorOption, actualThemeMode as 'light' | 'dark');
    }
  }, [currentThemeMode, systemTheme]); // Re-run when light/dark mode changes


  return (
    <div className="flex h-screen bg-background"> {/* bg-background will respect theme */}
      <Sidebar
        isDesktopOpen={isDesktopSidebarOpen}
        toggleDesktopSidebar={toggleDesktopSidebar}
        isMobileSheetOpen={isMobileSheetOpen}
        setIsMobileSheetOpen={setIsMobileSheetOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav setIsMobileSheetOpen={setIsMobileSheetOpen} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-3 sm:p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
