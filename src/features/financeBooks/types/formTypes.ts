import { FinanceBookTypes } from "./financeBookTypes";

export interface FinanceBookFormTypes {
    onClose: () => void;
    dataFB: FinanceBookTypes;
    mode: "create" | "update";
    setIsSaving: (value: boolean) => void;
}