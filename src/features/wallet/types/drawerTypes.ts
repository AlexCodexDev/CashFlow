export interface WalletDrawerTypes {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    code?: string;
}