import { Tag } from "lucide-react";
import { TagPreviewTypes } from "../types/previewTypes";
import { cn } from "@/lib/utils";

export function TagFieldPreview({ colorValue, tagName, bgSize, textSize }: TagPreviewTypes) {
    const previewName = tagName || "Tag Name";
    const previewColor = colorValue || "bg-background";
    const txtSize = textSize || "text-lg font-medium";
    const bgColorSize = bgSize || "size-6";

    return (
        <div className="flex gap-3 items-center">
            <div className={cn("flex gap-2 items-center", txtSize)}>
                <Tag className={cn(previewColor, "transition-all duration-300")} />
                {previewName}
            </div>
        </div>
    );
}