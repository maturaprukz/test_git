"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { LayoutDashboard, Users, Settings, PanelLeft, PanelRight, X as XIcon } from 'lucide-react';
import { cn } from "@/lib/utils";

interface SidebarProps {
  isDesktopOpen: boolean;
  toggleDesktopSidebar: () => void;
  isMobileSheetOpen: boolean;
  setIsMobileSheetOpen: (open: boolean) => void;
}

export default function Sidebar({
  isDesktopOpen,
  toggleDesktopSidebar,
  isMobileSheetOpen,
  setIsMobileSheetOpen,
}: SidebarProps) {
  const { t } = useTranslation('common'); // Initialize useTranslation
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', labelKey: 'sidebar_overview', icon: <LayoutDashboard className="h-5 w-5" /> },
    { href: '/dashboard/users', labelKey: 'sidebar_users', icon: <Users className="h-5 w-5" /> },
    { href: '/dashboard/settings', labelKey: 'sidebar_settings', icon: <Settings className="h-5 w-5" /> },
  ];

  const NavLink = ({ href, labelKey, icon, isDesktopOpenState, isMobile = false }: { href: string, labelKey: string, icon: React.ReactNode, isDesktopOpenState?: boolean, isMobile?: boolean }) => (
    <Link
      href={href}
      onClick={() => {
        if (isMobile) setIsMobileSheetOpen(false);
      }}
      className={cn(
        "flex items-center p-2 rounded-md transition-colors",
        isDesktopOpenState || isMobile ? 'justify-start' : 'justify-center',
        pathname.endsWith(href) // More robust active link check for nested routes
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "hover:bg-accent hover:text-accent-foreground",
        isMobile ? "text-lg my-1" : "text-sm"
      )}
      aria-current={pathname.endsWith(href) ? "page" : undefined}
    >
      <span className={cn("flex-shrink-0", isDesktopOpenState || isMobile ? "w-6 h-6" : "w-7 h-7")}>{icon}</span>
      {(isDesktopOpenState || isMobile) && <span className="ml-3">{t(labelKey)}</span>}
    </Link>
  );

  const sidebarContent = (isMobileView = false) => (
    <>
      {isMobileView && (
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="text-lg font-semibold">{t('admin_panel_title')}</SheetTitle>
           <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <XIcon className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </SheetHeader>
      )}
       {!isMobileView && (
         <div className={cn("p-4 flex items-center border-b h-16", isDesktopOpen ? "justify-between" : "justify-center")}>
          {isDesktopOpen && <h1 className="text-xl font-semibold text-foreground">{t('admin_panel_title')}</h1>}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDesktopSidebar}
            className="hidden md:flex"
            aria-label={isDesktopOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isDesktopOpen ? <PanelLeft className="h-5 w-5" /> : <PanelRight className="h-5 w-5" />}
          </Button>
        </div>
       )}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink key={item.labelKey} {...item} isDesktopOpenState={isDesktopOpen} isMobile={isMobileView} />
        ))}
      </nav>
      {(isDesktopOpen || isMobileView) && (
        <div className="p-4 border-t">
          <p className="text-xs text-muted-foreground">© 2024 {t('admin_panel_title')}</p>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col bg-card text-card-foreground border-r transition-all duration-300 ease-in-out h-full",
          isDesktopOpen ? 'w-64' : 'w-20'
        )}
      >
        {sidebarContent(false)}
      </aside>

      {/* Mobile Sidebar using Sheet */}
      <Sheet open={isMobileSheetOpen} onOpenChange={setIsMobileSheetOpen}>
        <SheetContent side="left" className="w-72 p-0 flex flex-col bg-card text-card-foreground border-r">
          {sidebarContent(true)}
        </SheetContent>
      </Sheet>
    </>
  );
}
