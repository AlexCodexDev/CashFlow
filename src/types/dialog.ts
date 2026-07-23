export interface DialogTypes {
    open: boolean;
    onClose: () => void;
    title: string;
    subtitle: string;
    description: string;
    onConfirm: () => void;
}