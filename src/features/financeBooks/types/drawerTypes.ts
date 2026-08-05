import { FinanceBookParams } from "@/schemas/financeBook.schema";

export interface FinanceBookDrawerTypes {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    code?: FinanceBookParams;
}