export interface CategoryCrudDialogTypes {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    code: string;
    bookCode: string;
}