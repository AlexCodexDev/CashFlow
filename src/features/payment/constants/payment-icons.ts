import { BanknoteArrowDown, BanknoteArrowUp, Coins, Ellipsis, Landmark, LucideIcon, QrCode, Smartphone } from "lucide-react";

export const paymentIcons: Record<string, LucideIcon> = {
    coins: Coins,
    qrcode: QrCode,
    landmark: Landmark,
    debit: BanknoteArrowDown,
    credit: BanknoteArrowUp,
    e_wallet: Smartphone,
    ellipsis: Ellipsis
}