import { writable } from 'svelte/store';
import { z } from 'zod';

// Enum for user types
const UserTypeEnum = z.enum(['Professional', 'Company', 'Founder', 'Admin']);

// Enum for company employee range
const CompanyEmployeeRangeEnum = z.enum(['SMALL', 'MEDIUM', 'LARGE', 'ENTERPRISE']);

// Schema for Professional
const ProfessionalSchema = z.object({
  jobTitle: z.string(),
  organizationName: z.string(),
  queryResponse: z.string(),
});
// Schema for Founder
const FounderSchema = z.object({
  employmentStatus: z.string(),
});

export const isError = writable<{ [key: string]: string }>({});

// Schema for Company
const CompanySchema = z.object({
  companyLocation: z.string(),
  industry: z.string(),
  companySize: CompanyEmployeeRangeEnum, // Corrected to enum
  companyWebsite: z.string().url(), // Added URL validation for companyWebsite
});

// Main User Schema
export const UserSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(), // Corrected to string
  userType: UserTypeEnum,
  isAdmin: z.boolean().optional(),
  Founder: FounderSchema.optional(),
  Professional: ProfessionalSchema.optional(),
  Company: CompanySchema.optional(),
}).refine(data => {
  if (data.userType === 'Professional' && !data.Professional) {
    return false;
  }
  if (data.userType === 'Company' && !data.Company) {
    return false;
  }
  if (data.userType === 'Founder' && !data.Founder) {
    return false;
  }
  if (data.userType === 'Admin') {
    return !data.Professional && !data.Company;
  }
  return true;
}, {
  message: "Invalid data based on user type",
  path: ["Professional", "Company", "Founder"],
});

export const newsletterSignUpSchema = z.object(
  {
    email: z.string().email(),
  }
)