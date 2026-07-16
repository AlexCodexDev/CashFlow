import { cn } from "@/lib/utils";
import { CategoryPreviewTypes } from "../types/previewTypes";
import { categoryIcons } from "../constants/category-icons";
import { AnimatePresence, motion } from "motion/react";
import { Utensils } from "lucide-react";

export function CategoryFieldPreview({ iconValue, colorValue, categoryName }: CategoryPreviewTypes) {
    const PreviewIcon = categoryIcons[iconValue] ?? Utensils;
    const previewName = categoryName || "Category Name";
    const previewColor = colorValue || "bg-background";
    const isDefault = previewColor === "bg-background";

    return (
        <>
            <div className="flex gap-3 items-center">
                <div className={cn("flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300", previewColor)}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={iconValue || "default"}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                        >
                            <PreviewIcon className={cn("size-6 transition-all duration-300 text-white", isDefault ? "text-foreground" : "text-white")} />
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="text-lg font-medium">
                    {previewName}
                </div>
            </div>
        </>
    );
}