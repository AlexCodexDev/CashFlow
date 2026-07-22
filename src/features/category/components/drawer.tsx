import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import type { CategoryDrawerTypes } from "../types/drawerTypes";
import { CategoryForm } from "./form";
import { useQuery } from "@tanstack/react-query";
import { getCategory, getCategoryByCode } from "@/services/category.service";
import { ChartNoAxesColumnDecreasing } from "lucide-react";

export function CategoryDrawer({ open, onOpenChange, title, code }: CategoryDrawerTypes) {
    const drawerDesc = title === "Create"
        ? "Add a new category to organize your transactions."
        : "Update your category information.";

    const { data, isLoading } = useQuery({
        queryKey: ["category", code],
        queryFn: () => getCategoryByCode(code!),
        enabled: !!code
    });

    console.log(data);

    return (
        <Drawer
            open={open}
            onOpenChange={onOpenChange}
            swipeDirection="right"
        >
            <DrawerContent className="w-3/12">
                <DrawerHeader>
                    <DrawerTitle className="font-semibold">{title} Category</DrawerTitle>
                    <DrawerDescription>{drawerDesc}</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 h-full">
                    <CategoryForm
                        onClose={() => onOpenChange(false)}
                        data={data}
                        flag={title}
                        code={code}
                    />
                </div>
            </DrawerContent>
        </Drawer>
    );
}