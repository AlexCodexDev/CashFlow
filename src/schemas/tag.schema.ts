import z from "zod";

export const TagSchema = z.object({
    name: z.string().trim().min(1, 'Name is required.').max(100),
    description: z.string().trim().optional(),
    color: z.string().trim().optional(),
    isActive: z.boolean().optional()
});

export type TagFormData = z.infer<typeof TagSchema>;