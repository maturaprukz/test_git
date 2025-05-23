"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserFormSchema, UserFormValues, UserRole, UserStatus } from '@/lib/validators/userValidator'; // Updated import
import { useTranslation } from 'react-i18next'; // Import useTranslation

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// Removed toast import as it's handled by the parent page

interface UserFormProps {
  initialData?: Partial<UserFormValues>;
  onFormSubmit: (data: UserFormValues) => void;
  isSubmitting: boolean;
  onClose: () => void;
}

export default function UserForm({ initialData, onFormSubmit, isSubmitting, onClose }: UserFormProps) {
  const { t } = useTranslation('common'); // Initialize useTranslation
  const isEditing = !!initialData?.id;

  // Create the schema with the t function
  const currentFormSchema = createUserFormSchema(t);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(currentFormSchema), // Use the t-function-wrapped schema
    defaultValues: initialData || {
      name: '',
      email: '',
      role: UserRole.Enum.User,
      status: UserStatus.Enum.Pending,
      password: '',
      confirmPassword: '',
    },
    // context: { isEditing } // Zod context setup for isEditing was part of schema, not form context here
  });

  const passwordValue = form.watch("password");

  const onSubmit = (data: UserFormValues) => {
    const { confirmPassword, ...submissionData } = data;
    if (!submissionData.password) {
        delete submissionData.password;
    }
    onFormSubmit(submissionData);
  };
  
  const getTranslatedRole = (role: UserRole) => t(`role_${role.toLowerCase()}` as const);
  const getTranslatedStatus = (status: UserStatus) => t(`status_${status.toLowerCase()}` as const);


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('user_form_label_name')}</FormLabel>
              <FormControl>
                <Input placeholder={t('user_form_placeholder_name')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('user_form_label_email')}</FormLabel>
              <FormControl>
                <Input type="email" placeholder={t('user_form_placeholder_email')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
                <FormItem>
                <FormLabel>{t('user_form_label_role')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder={t('user_form_placeholder_role')} />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {UserRole.options.map(roleValue => (
                        <SelectItem key={roleValue} value={roleValue}>
                        {getTranslatedRole(roleValue)}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
                <FormItem>
                <FormLabel>{t('user_form_label_status')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder={t('user_form_placeholder_status')} />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {UserStatus.options.map(statusValue => (
                        <SelectItem key={statusValue} value={statusValue}>
                        {getTranslatedStatus(statusValue)}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{isEditing ? t('user_form_label_password_edit') : t('user_form_label_password_new')}</FormLabel>
              <FormControl>
                <Input type="password" placeholder={t('user_form_placeholder_password')} {...field} />
              </FormControl>
              <FormDescription>
                {isEditing ? t('user_form_desc_password_edit') : t('user_form_desc_password_new')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Conditionally render Confirm Password field */}
        {/* Always show for new users, or if password field has content during edit */}
        {(!isEditing || (isEditing && passwordValue && passwordValue.length > 0)) && (
            <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
                <FormItem>
                <FormLabel>{t('user_form_label_confirm_password')}</FormLabel>
                <FormControl>
                    <Input type="password" placeholder={t('user_form_placeholder_password')} {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        )}
        
        <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                {t('cancel')}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting 
                    ? (isEditing ? t('form_submitting_saving') : t('form_submitting_creating')) 
                    : (isEditing ? t('save_changes') : t('add_new_user'))} 
            </Button>
        </div>
      </form>
    </Form>
  );
}
