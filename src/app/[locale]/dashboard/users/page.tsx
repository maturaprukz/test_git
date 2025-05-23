"use client";

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Import Avatar
import { MoreHorizontal, PlusCircle, User as UserIconLucide } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserForm from '@/components/users/UserForm';
import { UserFormValues, UserRole as UserRoleZodEnum, UserStatus as UserStatusZodEnum } from '@/lib/validators/userValidator';
import { useToast } from '@/hooks/use-toast';
import { mockUsers as initialMockUsers, MockUser, getInitials, UserRole, UserStatus } from '@/lib/mock-data'; // Import centralized mock data

export default function UsersPage() {
  const { t } = useTranslation('common');
  
  const [users, setUsers] = useState<MockUser[]>(initialMockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Partial<UserFormValues> | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.department && user.department.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusBadgeVariant = (status: MockUser["status"]): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "Active": return "default";
      case "Pending": return "secondary";
      case "Banned": return "destructive";
      default: return "outline";
    }
  };
  
  const getTranslatedRole = (role: UserRole): string => t(`role_${role.toLowerCase()}` as const);
  const getTranslatedStatus = (status: UserStatus): string => t(`status_${status.toLowerCase()}` as const);

  const handleAddUserClick = () => {
    setEditingUser(undefined);
    setIsUserFormOpen(true);
  };

  const handleEditUserClick = (user: MockUser) => {
    const userDataForForm: Partial<UserFormValues> = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as UserRoleZodEnum, // Ensure type compatibility with Zod enum
      status: user.status as UserStatusZodEnum, // Ensure type compatibility with Zod enum
    };
    setEditingUser(userDataForForm);
    setIsUserFormOpen(true);
  };

  const handleUserFormSubmit = (data: UserFormValues) => {
    setIsSubmitting(true);
    setTimeout(() => {
      if (data.id) { // Editing existing user
        setUsers(prevUsers => prevUsers.map(u => 
          u.id === data.id ? { 
            ...u, 
            ...data, 
            // Ensure role and status are correctly typed back to MockUser types
            role: data.role as UserRole, 
            status: data.status as UserStatus 
          } : u
        ));
        toast({ title: t('user_updated_toast_title'), description: t('user_updated_toast_desc', { name: data.name }) });
      } else { // Adding new user
        const newUser: MockUser = {
          ...data,
          id: `USR${String(users.length + 100).padStart(3, '0')}`, // Ensure unique ID generation
          joinedDate: new Date().toISOString().split('T')[0],
          avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=random`,
          lastLogin: new Date().toISOString(),
          // Ensure role and status are correctly typed
          role: data.role as UserRole, 
          status: data.status as UserStatus,
          department: "Unassigned", // Default department or make it part of form
          countryCode: "N/A"
        };
        setUsers(prevUsers => [newUser, ...prevUsers]); // Add to top for visibility
        toast({ title: t('user_created_toast_title'), description: t('user_created_toast_desc', {name: data.name}) });
      }
      setIsSubmitting(false);
      setIsUserFormOpen(false);
    }, 1000);
  };

  const formatLastLogin = (isoDate?: string) => {
    if (!isoDate) return 'N/A';
    try {
      return new Date(isoDate).toLocaleDateString(t('common:current_locale_code') || 'en-US', { // Assuming current_locale_code is in common.json
        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
      });
    } catch (e) { return 'Invalid Date';}
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">{t('title_users')}</h1>
        <Dialog open={isUserFormOpen} onOpenChange={setIsUserFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddUserClick}>
              <PlusCircle className="mr-2 h-4 w-4" /> {t('add_new_user')}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg"> {/* Increased width slightly */}
            <DialogHeader>
              <DialogTitle>{editingUser?.id ? t('user_form_title_edit') : t('user_form_title_add')}</DialogTitle>
              <DialogDescription>
                {editingUser?.id ? t('user_form_desc_edit') : t('user_form_desc_add')}
              </DialogDescription>
            </DialogHeader>
            <UserForm
              initialData={editingUser}
              onFormSubmit={handleUserFormSubmit}
              isSubmitting={isSubmitting}
              onClose={() => setIsUserFormOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Input
        placeholder={t('search_users_placeholder')}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-md" // Slightly wider search bar
      />

      {/* Comment on Pagination:
          For a large number of users, pagination would be implemented here.
          This typically involves:
          1. State for current page, items per page.
          2. Slicing the `filteredUsers` array based on current page and items per page.
          3. Adding a Pagination component (e.g., Shadcn UI's Pagination) below the table.
          4. Handlers to update current page state when pagination controls are clicked.
          Backend pagination is preferred for very large datasets to avoid loading all data client-side.
      */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-full sm:w-[200px] md:w-[250px]">{t('users_table_col_name')}</TableHead>
                <TableHead>{t('users_table_col_role')}</TableHead>
                <TableHead className="hidden sm:table-cell">{t('users_table_col_status')}</TableHead>
                <TableHead className="hidden lg:table-cell">{t('users_table_col_joined_date')}</TableHead>
                <TableHead className="hidden md:table-cell">Last Login</TableHead> {/* New Column */}
                <TableHead className="text-right">
                  <span className="sr-only">{t('users_table_col_actions')}</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{getInitials(user.name) || <UserIconLucide size={18}/>}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getTranslatedRole(user.role)}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant={getStatusBadgeVariant(user.status)}>{getTranslatedStatus(user.status)}</Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{user.joinedDate}</TableCell>
                  <TableCell className="hidden md:table-cell">{formatLastLogin(user.lastLogin)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{t('users_actions_label')}</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEditUserClick(user)}>
                          {t('users_actions_edit')}
                        </DropdownMenuItem>
                        <DropdownMenuItem>{t('users_actions_view_details')}</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                          {t('users_actions_delete')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {filteredUsers.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">{t('no_users_found')}</p>
        </div>
      )}
    </div>
  );
}
