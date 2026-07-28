import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { TagPreviewTypes } from "../types/previewTypes";

export function TagFieldPreview({ colorValue, tagName, bgSize, textSize }: TagPreviewTypes) {
    const previewName = tagName || "Tag Name";
    const previewColor = colorValue || "bg-background";
    const txtSize = textSize || "text-lg font-medium";
    const bgColorSize = bgSize || "size-6";

    return (
        <div className="flex gap-3 items-center">
            {/* <div className={cn(bgColorSize, "flex items-center justify-center rounded-full transition-all duration-300", previewColor)}> */}
                {/* <AnimatePresence mode="wait">
                    <motion.div
                        key={"default"}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                    >
                    </motion.div>
                </AnimatePresence> */}
            {/* </div> */}
            <div className={txtSize}>
                {previewName}
            </div>
        </div>
    );
}