import { FinanceBookTypes } from "./financeBookTypes";

export interface FinanceBookFormTypes {
    onClose: () => void;
    dataCat: FinanceBookTypes;
    mode: "create" | "update";
    setIsSaving: (value: boolean) => void;
}