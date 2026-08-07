import { z } from "zod";

export const CategorySchema = z.object({
    financeBookCode: z.string().trim().min(1, "Finance book code is required."),
    name: z.string().trim().min(1, "Name is required.").max(100),
    description: z.string().trim().optional(),
    color: z.string().trim().optional(),
    icon: z.string().trim().optional(),
    isActive: z.boolean().optional()
});

export type CategoryFormData = z.infer<typeof CategorySchema>;