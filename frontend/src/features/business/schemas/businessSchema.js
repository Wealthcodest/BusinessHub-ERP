import { z } from "zod";

export const businessSchema = z.object({
  // =========================
  // BUSINESS INFORMATION
  // =========================
  name: z
    .string()
    .min(3, "Business name must be at least 3 characters.")
    .max(150, "Business name is too long."),

  businessType: z
    .string()
    .min(1, "Please select a business type."),

  industry: z
    .string()
    .min(1, "Please select an industry."),

  registrationNumber: z
    .string()
    .optional(),

  taxNumber: z
    .string()
    .optional(),

  // =========================
  // CONTACT INFORMATION
  // =========================
  email: z
    .string()
    .email("Please enter a valid email address."),

  phone: z
    .string()
    .min(7, "Phone number is too short.")
    .max(20, "Phone number is too long."),

  website: z
  .string()
  .optional()
  .refine(
    (value) => {
      if (!value || value.trim() === "") return true;

      return /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/.*)?$/.test(
        value
      );
    },
    {
      message: "Please enter a valid website.",
    }
  ),

  // =========================
  // ADDRESS
  // =========================
  country: z
    .string()
    .min(2, "Country is required."),

  state: z
    .string()
    .optional(),

  city: z
    .string()
    .optional(),

  address: z
    .string()
    .optional(),

  // =========================
  // BUSINESS SETTINGS
  // =========================
  currency: z
    .string()
    .min(1, "Currency is required."),

  timezone: z
    .string()
    .min(1, "Timezone is required."),

  status: z.enum([
    "active",
    "inactive",
  ]),

  description: z
    .string()
    .max(1000, "Description cannot exceed 1000 characters.")
    .optional(),

  logo: z
    .any()
    .optional(),
});

export default businessSchema;