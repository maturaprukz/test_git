"use client"; // Recharts components are client-side

import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, CreditCard, Activity, TrendingUp } from "lucide-react";
import { useTranslation } from 'react-i18next'; // For client-side translations
import { mockUsers, mockSales, mockDailySalesLast7Days, MockUser, MockSale, DailySales } from '@/lib/mock-data'; // Import mock data
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'; // Import Recharts components
import { useTheme } from 'next-themes'; // To get current theme for chart colors

// This page will be a client component due to Recharts and dynamic data calculations.
// If it were a Server Component, data fetching/processing would happen on the server.

export default function DashboardOverviewPage() {
  const { t } = useTranslation('common');
  const { theme } = useTheme(); // For chart colors

  const chartThemeColors = useMemo(() => {
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    return {
      stroke: isDark ? '#8884d8' : '#8884d8', // Example: Purple for dark, Blue for light
      fill: isDark ? 'rgba(136, 132, 216, 0.2)' : 'rgba(136, 132, 216, 0.2)', // Example fill
      grid: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      tooltipBackground: isDark ? '#333' : '#fff',
      tooltipText: isDark ? '#fff' : '#333',
      axisText: isDark ? '#ccc' : '#666',
    };
  }, [theme]);


  // Calculate summary data
  const totalRevenue = useMemo(() => mockSales.reduce((sum, sale) => sum + sale.amount, 0), []);
  const activeUsers = useMemo(() => mockUsers.filter(user => user.status === 'Active').length, []);
  
  const salesToday = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    return mockSales
      .filter(sale => sale.date === todayStr)
      .reduce((sum, sale) => sum + sale.amount, 0);
  }, []);

  const newSignupsToday = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    return mockUsers.filter(user => user.joinedDate === todayStr).length;
  }, []);

  // Format currency (could be moved to a util if used elsewhere)
  const formatCurrency = (amount: number) => {
    // Using 'USD' for now, could be made dynamic with i18n locale
    return new Intl.NumberFormat(t('current_locale_code') || 'en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };
  
  // Format date for chart XAxis labels
  const formatXAxisDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString(t('current_locale_code') || 'en-US', { month: 'short', day: 'numeric' });
    } catch (e) { return dateString; } // Fallback
  };


  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">{t('title_overview')}</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('overview_card_total_revenue')}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('overview_card_active_users')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers}</div>
            {/* <p className="text-xs text-muted-foreground">+180 since last week</p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('overview_card_sales_today')}</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(salesToday)}</div>
            {/* <p className="text-xs text-muted-foreground">+19% from yesterday</p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('overview_card_new_signups_today')}</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{newSignupsToday}</div>
            {/* <p className="text-xs text-muted-foreground">+5 since last hour</p> */}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-primary" />
            {t('overview_chart_sales_trends_title')}
          </CardTitle>
          <CardDescription>
            {t('overview_chart_sales_trends_desc')}
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80 md:h-96"> {/* Adjusted height for responsiveness */}
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={mockDailySalesLast7Days}
              margin={{
                top: 5,
                right: 20,
                left: 5, // Added small left margin
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={chartThemeColors.grid} />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatXAxisDate}
                stroke={chartThemeColors.axisText}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                stroke={chartThemeColors.axisText}
                tickFormatter={(value) => `$${value / 1000}k`} // Format Y-axis ticks
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: chartThemeColors.tooltipBackground, 
                  borderColor: chartThemeColors.grid,
                  color: chartThemeColors.tooltipText,
                  borderRadius: '0.5rem', // Corresponds to Shadcn --radius
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' // Shadcn shadow-md
                }}
                formatter={(value: number) => [formatCurrency(value), "Total Sales"]}
                labelFormatter={(label: string) => new Date(label).toLocaleDateString(t('current_locale_code') || 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              />
              <Legend wrapperStyle={{ fontSize: '0.875rem' }} />
              <Line 
                type="monotone" 
                dataKey="totalSales" 
                stroke={chartThemeColors.stroke} 
                strokeWidth={2}
                fill={chartThemeColors.fill}
                activeDot={{ r: 6 }} 
                name="Total Sales" // This will appear in Legend and Tooltip
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
