import { CategoryTypes } from "./category";
export interface CategoryFormTypes {
    onClose: () => void;
    dataCat: CategoryTypes;
    mode: "create" | "update";
}