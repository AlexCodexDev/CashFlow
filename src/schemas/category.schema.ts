import { z } from "zod";

export const CategorySchema = z.object({
    name: z.string().trim().min(1, "Name is required.").max(100),
    description: z.string().trim().optional(),
    color: z.string().trim().optional(),
    icon: z.string().trim().optional(),
    isActive: z.boolean()
});

export type CategoryFormData = z.infer<typeof CategorySchema>;