import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { PaymentIconFieldTypes } from "../types/iconTypes";
import { paymentIcons } from "../constants/payment-icons";

export function PaymentIconField({ value, onValueChange }: PaymentIconFieldTypes) {
    const icons = [
        {
            value: "coins",
            icon: paymentIcons.coins,
            tooltip: "Cash"
        },
        {
            value: "qrcode",
            icon: paymentIcons.qrcode,
            tooltip: "Qris"
        },
        {
            value: "landmark",
            icon: paymentIcons.landmark,
            tooltip: "Bank Transfer"
        },
        {
            value: "debit",
            icon: paymentIcons.debit,
            tooltip: "Debit"
        },
        {
            value: "credit",
            icon: paymentIcons.credit,
            tooltip: "Credit"
        },
        {
            value: "e_wallet",
            icon: paymentIcons.e_wallet,
            tooltip: "E-Wallet"
        },
        {
            value: "ellipsis",
            icon: paymentIcons.ellipsis,
            tooltip: "Others"
        }
    ];

    return (
        <>
            {icons.map((item) => {
                const Icon = item.icon;

                return (
                    <Tooltip key={item.value}>
                        <TooltipTrigger
                            render={<Button
                                key={item.value}
                                type="button"
                                variant="outline"
                                size="lg"
                                className={cn("w-full h-14 rounded-sm", value === item.value ? "border-2 border-primary" : "")}
                                title={item.tooltip}
                                onClick={() => onValueChange(item.value)}
                            >
                                <Icon className="size-5" />
                            </Button>}
                        />
                        <TooltipContent>
                            {item.tooltip}
                        </TooltipContent>
                    </Tooltip>
                    
                );
            })}
        </>
    );
}