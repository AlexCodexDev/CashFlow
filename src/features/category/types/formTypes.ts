import { CategoryTypes } from "./category";
export interface CategoryFormTypes {
    dataCat: CategoryTypes;
    isCreate: boolean;
    bookCode: string;
    onClose: () => void;
}