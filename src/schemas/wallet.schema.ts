import z from "zod";

export const WalletSchema = z.object({
    name: z.string().trim().min(1, "Name is required.").max(100),
    financeBookCode: z.string().trim().min(1, "Finance book code is required."),
    openingBalance: z.number().min(1, "Opening balance is required."),
    currentBalance: z.number().min(1, "Currnet balance is required."),
    description: z.string().trim().optional(),
    isActive: z.boolean().optional()
});
export type WalletFormData = z.infer<typeof WalletSchema>;