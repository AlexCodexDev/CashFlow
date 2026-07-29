import { Button } from "@/components/ui/button";
import { TagColorTypes } from "../types/colorTypes";
import { cn } from "@/lib/utils";

export function TagColorField({ value, onValueChange }: TagColorTypes) {
    const colorList = [
        {
            color: "text-background",
            bgColor: "bg-background"
        },
        {
            color: "text-success",
            bgColor: "bg-success"
        },
        {
            color: "text-warning",
            bgColor: "bg-warning"
        },
        {
            color: "text-danger",
            bgColor: "bg-danger"
        },
        {
            color: "text-info",
            bgColor: "bg-info"
        },
        {
            color: "text-foreground",
            bgColor: "bg-foreground"
        },
        {
            color: "text-text-body",
            bgColor: "bg-text-body"
        }
    ]

    return (
        <>
            {colorList.map((item) => (
                <Button
                    key={item.color}
                    type="button"
                    variant="default"
                    size="lg"
                    className={cn(item.bgColor, "w-full", value === item.color ? "border-2 border-primary" : "", item.color === "bg-background" ? "border-primary" : "")}
                    onClick={() => onValueChange(item.color)}
                ></Button>
            ))}
        </>
    );
}