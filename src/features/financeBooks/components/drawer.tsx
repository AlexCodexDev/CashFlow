import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useQuery } from "@tanstack/react-query";
import { getCategoryByCode } from "@/services/category.service";
import { useState } from "react";
import { FinanceBookDrawerTypes } from "../types/drawerTypes";
import { FinanceBookForm } from "./form";
import { useIsMobile } from "@/hooks/use-mobile";

export function FinanceBookDrawer({ open, onOpenChange, title, code }: FinanceBookDrawerTypes) {
    const isMobile = useIsMobile();

    const option = title === "Create";
    const drawerDesc = option
        ? "Add a new finance book to organize your transactions."
        : "Update your finance book information.";

    const { data } = useQuery({
        queryKey: ["financeBooks", code],
        queryFn: () => getCategoryByCode(code!),
        enabled: !!code
    });
    const [isSaving, setIsSaving] = useState(false);

    return (
        <Drawer
            open={open}
            onOpenChange={(value) => {
                if(isSaving && !value) return;
                onOpenChange(value);
            }}
            swipeDirection={isMobile ? "down" : "right"}
            disablePointerDismissal={!isSaving}
            
        >
            <DrawerContent className={isMobile ? "w-full" : "w-3/12"}>
                <DrawerHeader>
                    <DrawerTitle className="font-semibold">{title} Finance Book</DrawerTitle>
                    <DrawerDescription>{drawerDesc}</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 h-full">
                    <FinanceBookForm
                        onClose={() => onOpenChange(false)}
                        dataCat={data}
                        mode={option ? "create" : "update" }
                        setIsSaving={setIsSaving}
                    />
                </div>
            </DrawerContent>
        </Drawer>
    );
}