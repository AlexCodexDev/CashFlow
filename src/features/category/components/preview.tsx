import { cn } from "@/lib/utils";
import { CategoryPreviewTypes } from "../types/previewTypes";
import { categoryIcons } from "../constants/category-icons";
import { AnimatePresence, motion } from "motion/react";
import { Utensils } from "lucide-react";

export function CategoryFieldPreview({ iconValue, colorValue, categoryName, iconSize, textSize, bgSize }: CategoryPreviewTypes) {
    const icon = iconValue || "utensils";
    const PreviewIcon = categoryIcons[icon] ?? Utensils;
    const previewName = categoryName || "Category Name";
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