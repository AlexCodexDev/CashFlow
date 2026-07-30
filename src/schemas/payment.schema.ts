import z from "zod";

export const PaymentSchema = z.object({
    name: z.string().trim().min(1, "Name is required.").max(100),
    color: z.string().trim().optional(),
    icon: z.string().trim().optional(),
    description: z.string().trim().optional(),
    isActive: z.boolean().optional()
});
export type PaymentFormData = z.infer<typeof PaymentSchema>;