import { WalletTypes } from "./wallet";

export interface WalletFormTypes {
    onClose: () => void;
    dataWal: WalletTypes;
    mode: "create" | "update";
    setIsSaving: (value: boolean) => void;
}