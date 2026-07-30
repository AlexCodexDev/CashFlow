import { PaymentTypes } from "./payment";

export interface PaymentFormTypes {
    onClose: () => void;
    dataPay: PaymentTypes;
    mode: "create" | "update";
    setIsSaving: (value: boolean) => void;
}