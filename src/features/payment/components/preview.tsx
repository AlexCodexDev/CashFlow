import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { Utensils } from "lucide-react";
import { PaymentPreviewTypes } from "../types/previewTypes";
import { paymentIcons } from "../constants/payment-icons";

export function PaymentFieldPreview({ iconValue, colorValue, paymentName, iconSize, textSize, bgSize }: PaymentPreviewTypes) {
    const icon = iconValue || "coins";
    const PreviewIcon = paymentIcons[icon] ?? Utensils;
    const previewName = paymentName || "Payment Name";
    const previewColor = colorValue || "bg-background";
    const isDefault = previewColor === "bg-background";
    const bgColorSize = bgSize || "h-14 w-14";
    const icnSize = iconSize || "size-6";
    const txtSize = textSize || "text-lg font-medium";

    return (
        <>
            <div className="flex gap-3 items-center">
                <div className={cn(bgColorSize, "flex items-center justify-center rounded-full transition-all duration-300", previewColor)}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={iconValue || "default"}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                        >
                            <PreviewIcon className={cn(icnSize, "transition-all duration-300 text-white", isDefault ? "text-foreground" : "text-white")} />
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className={txtSize}>
                    {previewName}
                </div>
            </div>
        </>
    );
}