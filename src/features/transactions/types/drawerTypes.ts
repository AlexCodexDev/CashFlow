export interface TransactionDrawerTypes {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    code?: string;
}