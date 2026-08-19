import { TransactionBody, TransactionParams } from "@/schemas/transaction.schema";

export interface TransactionFormTypes {
    code: string;
    onClose: () => void;
    mode: "create" | "update";
    setIsSaving: (value: boolean) => void;
    dataTrans: TransactionBody,
    bookCode: string;
}