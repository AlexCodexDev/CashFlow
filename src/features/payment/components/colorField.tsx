import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PaymentColorFieldTypes } from "../types/colorTypes";

export function PaymentColorField({ value, onValueChange }: PaymentColorFieldTypes) {
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
                    key={item.color}
                    type="button"
                    variant="default"
                    size="lg"
                    className={cn(item.color, "w-full", value === item.color ? "border-2 border-primary" : "", item.color === "bg-background" ? "border-primary" : "")}
                    onClick={() => onValueChange(item.color)}
                ></Button>
            ))}
        </>
    );
}