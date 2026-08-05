import z from "zod";

const types = ["PERSONAL","BUSSINESS"] as const;

export const FinanceBookSchema = z.object({
    name: z.string().trim().min(1, "Name is required.").max(100),
    type: z.enum(types),
    description: z.string().trim().optional(),
    logo: z.string().trim().optional()
});
export type FinanceBookBody = z.infer<typeof FinanceBookSchema>;

export const FinanceBookParamSchema = z.object({
    code: z.string().trim().min(1, "Code is required.").max(50)
});
export type FinanceBookParams = z.infer<typeof FinanceBookParamSchema>;