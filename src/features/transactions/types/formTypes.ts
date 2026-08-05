export interface TransactionFormTypes {
    onClose: () => void;
    mode: "create" | "update";
    setIsSaving: (value: boolean) => void;
}