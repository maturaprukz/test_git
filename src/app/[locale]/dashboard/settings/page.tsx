"use client";

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useTheme } from 'next-themes';
import { themeColorOptions, applyThemeColors, defaultColorName, ColorOption } from '@/lib/theme-colors'; // Import theme color utilities
import { cn } from '@/lib/utils'; // For conditional classes on swatches

interface SettingsFormValues {
  username: string;
  email: string;
  emailNotifications: boolean;
  language: string;
}

export default function SettingsPage() {
  const { t } = useTranslation('common');
  const { theme: currentThemeMode, setTheme: setNextThemeMode } = useTheme(); // 'theme' from next-themes is light/dark/system
  const { toast } = useToast();

  const [settings, setSettings] = useState<Partial<SettingsFormValues>>({
    emailNotifications: true,
    language: "en-US",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [displayUsername, setDisplayUsername] = useState("admin_user");
  const [displayEmail, setDisplayEmail] = useState("admin@example.com");
  const [selectedPrimaryColor, setSelectedPrimaryColor] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedPrimaryColor') || defaultColorName;
    }
    return defaultColorName;
  });

  // Effect to apply the theme colors when the component mounts or theme/color preference changes
  useEffect(() => {
    const actualThemeMode = currentThemeMode === 'system' 
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') 
      : currentThemeMode || 'light';

    const selectedColorOption = themeColorOptions.find(opt => opt.name === selectedPrimaryColor) || 
                               themeColorOptions.find(opt => opt.name === defaultColorName);
    if (selectedColorOption) {
      applyThemeColors(selectedColorOption, actualThemeMode as 'light' | 'dark');
    }
  }, [selectedPrimaryColor, currentThemeMode]);


  const handlePrimaryColorChange = (colorName: string) => {
    setSelectedPrimaryColor(colorName);
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedPrimaryColor', colorName);
    }
    // The useEffect will handle applying the colors
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSettings(prev => ({ ...prev, [id]: value }));
  };

  const handleSwitchChange = (id: keyof Pick<SettingsFormValues, 'emailNotifications'>, checked: boolean) => {
    setSettings(prev => ({ ...prev, [id]: checked }));
  };

  const handleSaveChanges = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      console.log("Settings saved:", settings);
      toast({
        title: t('settings_saved_toast_title'),
        description: t('settings_saved_toast_desc'),
        duration: 3000,
      });
    }, 1500);
  };

  return (
    <>
      <Toaster />
      <div className="space-y-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground">{t('title_settings')}</h1>

        {/* Profile Settings Card - No changes needed here */}
        <Card>
          <CardHeader>
            <CardTitle>{t('settings_profile_title')}</CardTitle>
            <CardDescription>{t('settings_profile_desc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">{t('settings_label_username')}</Label>
              <Input id="username" value={displayUsername} disabled />
              <p className="text-xs text-muted-foreground">{t('settings_username_cannot_change')}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t('settings_label_email')}</Label>
              <Input id="email" type="email" value={displayEmail} disabled />
              <p className="text-xs text-muted-foreground">{t('settings_email_cannot_change')}</p>
            </div>
          </CardContent>
        </Card>

        {/* Interface Preferences Card - Adding Theme Customization here */}
        <Card>
          <CardHeader>
            <CardTitle>{t('settings_interface_title')}</CardTitle>
            <CardDescription>{t('settings_interface_desc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Email Notifications Switch */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 sm:space-x-2 p-4 border rounded-lg">
              <div className="space-y-0.5">
                  <Label htmlFor="emailNotifications" className="text-base">{t('settings_label_email_notifications')}</Label>
                  <p className="text-sm text-muted-foreground sm:text-left">
                      {t('settings_desc_email_notifications')}
                  </p>
              </div>
              <Switch
                id="emailNotifications"
                checked={settings.emailNotifications || false}
                onCheckedChange={(checked) => handleSwitchChange("emailNotifications", checked)}
              />
            </div>
            
            {/* Dark Mode Switch */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 sm:space-x-2 p-4 border rounded-lg">
              <div className="space-y-0.5">
                  <Label htmlFor="darkModeToggle" className="text-base">{t('settings_label_dark_mode')}</Label>
                  <p className="text-sm text-muted-foreground sm:text-left">
                      {t('settings_desc_dark_mode', { theme: currentThemeMode || 'system' })}
                  </p>
              </div>
              <Switch
                id="darkModeToggle"
                aria-label="Toggle Dark Mode"
                checked={currentThemeMode === 'dark'}
                onCheckedChange={(checked) => setNextThemeMode(checked ? 'dark' : 'light')}
              />
            </div>

            {/* Language Input - No changes needed here */}
            <div className="space-y-2">
              <Label htmlFor="language">{t('settings_label_language')}</Label>
              <Input 
                id="language" 
                value={settings.language} 
                onChange={handleInputChange} 
                placeholder="e.g., en-US" 
              />
              <p className="text-xs text-muted-foreground">{t('settings_desc_language')}</p>
            </div>

            {/* Primary Color Customization */}
            <div className="space-y-2 pt-4 border-t">
              <Label className="text-base">Primary Color</Label> {/* Key needed: settings_label_primary_color */}
              <p className="text-sm text-muted-foreground">
                Choose a primary color for the dashboard theme. {/* Key needed: settings_desc_primary_color */}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {themeColorOptions.map((color) => (
                  <Button
                    key={color.name}
                    variant="outline"
                    size="icon"
                    onClick={() => handlePrimaryColorChange(color.name)}
                    className={cn(
                      "h-10 w-10 rounded-full border-2",
                      selectedPrimaryColor === color.name ? 'border-ring ring-2 ring-ring ring-offset-2' : 'border-muted'
                    )}
                    aria-label={`Set primary color to ${color.name}`}
                  >
                    <span
                      className="block h-full w-full rounded-full"
                      style={{ 
                        backgroundColor: `hsl(${currentThemeMode === 'dark' ? color.primary.dark : color.primary.light})` 
                      }}
                    />
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button onClick={handleSaveChanges} disabled={isSaving}>
            {isSaving ? t('form_submitting_saving') : t('save_changes')}
          </Button>
        </div>
      </div>
    </>
  );
}
