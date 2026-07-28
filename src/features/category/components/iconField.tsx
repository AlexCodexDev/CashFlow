import { Button } from "@/components/ui/button";
import { CategoryIconFieldTypes } from "../types/iconTypes";
import { cn } from "@/lib/utils";
import { categoryIcons } from "../constants/category-icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function CategoryIconField({ value, onValueChange }: CategoryIconFieldTypes) {
    const icons = [
        {
            value: "utensils",
            icon: categoryIcons.utensils,
            tooltip: "Food"
        },
        {
            value: "car",
            icon: categoryIcons.car,
            tooltip: "Transportation"
        },
        {
            value: "home",
            icon: categoryIcons.home,
            tooltip: "House"
        },
        {
            value: "gift",
            icon: categoryIcons.gift,
            tooltip: "Gift"
        },
        {
            value: "wallet",
            icon: categoryIcons.wallet,
            tooltip: "E-Wallet"
        },
        {
            value: "chart",
            icon: categoryIcons.chart,
            tooltip: "Invest"
        },
        {
            value: "graduation",
            icon: categoryIcons.graduation,
            tooltip: "Collage"
        },
        {
            value: "handbag",
            icon: categoryIcons.handbag,
            tooltip: "Shopping"
        },
        {
            value: "heart",
            icon: categoryIcons.heart,
            tooltip: "Love"
        },
        {
            value: "ellipsis",
            icon: categoryIcons.ellipsis,
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