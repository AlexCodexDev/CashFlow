import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import type { CategoryDrawerTypes } from "../types/drawerTypes";
import { CategoryForm } from "./form";
import { useQuery } from "@tanstack/react-query";
import { getCategoryByCode } from "@/services/category.service";

export function CategoryDrawer({ open, onOpenChange, title, code }: CategoryDrawerTypes) {
    const option = title === "Create";
    const drawerDesc = option
        ? "Add a new category to organize your transactions."
        : "Update your category information.";

    const { data, isLoading } = useQuery({
        queryKey: ["category", code],
        queryFn: () => getCategoryByCode(code!),
        enabled: !!code
    });

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
                        dataCat={data}
                        mode={option ? "create" : "update" }
                    />
                </div>
            </DrawerContent>
        </Drawer>
    );
}