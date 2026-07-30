import z from "zod";

export const WalletSchema = z.object({
    name: z.string().trim().min(1, "Name is required.").max(100),
    paymentCode: z.string().trim().min(1, "Payment is required."),
    description: z.string().trim().optional(),
    isActive: z.boolean().optional()
});
export type WalletFormData = z.infer<typeof WalletSchema>;