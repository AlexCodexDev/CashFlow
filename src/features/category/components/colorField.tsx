import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CategoryColorFieldTypes } from "../types/colorTypes";

export function CategoryColorField({ value, onValueChange }: CategoryColorFieldTypes) {
    const colorList = [
        {
            color: "bg-background"
        },
        {
            color: "bg-success"
        },
        {
            color: "bg-warning"
        },
        {
            color: "bg-danger"
        },
        {
            color: "bg-info"
        },
        {
            color: "bg-foreground"
        },
        {
            color: "bg-text-body"
        }
    ]

    return (
        <>
            {colorList.map((item) => (
                <Button
                    variant="default"
                    size="lg"
                    className={cn(item.color, "w-full", value === item.color ? "border-2 border-primary" : "", item.color === "bg-background" ? "border-primary" : "")}
                    onClick={() => onValueChange(item.color)}
                ></Button>
            ))}
        </>
    );
}