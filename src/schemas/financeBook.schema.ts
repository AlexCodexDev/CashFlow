import z from "zod";

export const FinanceBookSchema = z.object({
    name: z.string().trim().min(1, "Name is required.").max(100),
    description: z.string().trim().optional(),
    logo: z.string().trim().optional()
});
export type FinanceBookBody = z.infer<typeof FinanceBookSchema>;