import { z } from 'zod';
import { TFunction } from 'i18next'; // Import TFunction type

export const UserRole = z.enum(["Admin", "Editor", "User"]);
export type UserRole = z.infer<typeof UserRole>;

export const UserStatus = z.enum(["Active", "Pending", "Banned"]);
export type UserStatus = z.infer<typeof UserStatus>;

// Function to create the schema, accepting a t function
export const createUserFormSchema = (t: TFunction) => z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: t('zod_error_name_min', { count: 2 }) }), // Example: "Name must be at least {{count}} characters."
  email: z.string().email({ message: t('zod_error_email_invalid') }), // Example: "Invalid email address."
  role: UserRole, // Enum validation messages are harder to translate directly without custom error maps
  status: UserStatus,
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
})
.refine(data => {
  if (data.password && data.password.length > 0) {
    return data.password === data.confirmPassword;
  }
  return true;
}, {
  message: t('zod_error_passwords_do_not_match'),
  path: ["confirmPassword"],
})
.refine(data => {
  if (data.password && data.password.length > 0 && data.password.length < 6) {
    return false;
  }
  return true;
}, {
  message: t('zod_error_password_min', { count: 6 }), // Example: "Password must be at least {{count}} characters."
  path: ["password"],
})
.refine(data => {
  // Access context to check if it's an editing scenario
  // This part is tricky as Zod context is not easily accessible in refine without specific setup.
  // The original schema had `!data.id` for new user check.
  if (!data.id && (!data.password || data.password.length === 0)) {
    return false;
  }
  return true;
}, {
  message: t('zod_error_password_required_new'), // Example: "Password is required for new users."
  path: ["password"],
});

// Define a base type without the t function for general use
export type UserFormValues = z.infer<ReturnType<typeof createUserFormSchema>>;

// Add new translation keys to common.json files for Zod errors:
// "zod_error_name_min": "Name must be at least {{count}} characters.",
// "zod_error_email_invalid": "Invalid email address.",
// "zod_error_passwords_do_not_match": "Passwords do not match.",
// "zod_error_password_min": "Password must be at least {{count}} characters.",
// "zod_error_password_required_new": "Password is required for new users."
