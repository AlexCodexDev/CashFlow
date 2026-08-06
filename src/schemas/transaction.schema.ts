import z from "zod";

const types = ["INCOME","EXPENSE"] as const;

export const TransactionBodySchema = z.object({
    name: z.string().trim().min(1, "Name is required."),
    categoryCode: z.string().trim().min(1, "Category is required."),
    walletCode: z.string().trim().min(1, "Wallet is required."),
    contactCode: z.string().trim().optional(),
    amount: z.number().min(1, "Amount is required."),
    type: z.enum(types),
    icon: z.string().trim().optional(),
    color: z.string().trim().optional(),
    description: z.string().trim().optional()
});
export type TransactionBody = z.infer<typeof TransactionBodySchema>;

export const TransactionParamSchema = z.object({
    code: z.string().trim().min(1, "Code is required.")
});
export type TransactionParams = z.infer<typeof TransactionParamSchema>;