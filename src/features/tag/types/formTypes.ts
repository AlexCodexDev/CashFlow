import { TagTypes } from "./tag";

export interface TagFormTypes {
    onClose: () => void;
    dataTag: TagTypes;
    mode: "create" | "update";
    setIsSaving: (value: boolean) => void;
}