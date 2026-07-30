export interface PaymentDrawerTypes {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    code?: string;
}