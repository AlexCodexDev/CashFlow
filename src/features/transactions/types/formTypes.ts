import { TransactionBody } from "@/schemas/transaction.schema";

export interface TransactionFormTypes {
    onClose: () => void;
    mode: "create" | "update";
    setIsSaving: (value: boolean) => void;
    dataTrans: TransactionBody,
    bookCode: string;
}