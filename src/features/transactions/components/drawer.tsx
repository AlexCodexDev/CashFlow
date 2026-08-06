import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useQuery } from "@tanstack/react-query";
import { getCategoryByCode } from "@/services/category.service";
import { useState } from "react";
import { TransactionDrawerTypes } from "../types/drawerTypes";
import { TransactionForm } from "./form";

export function TransactionDrawer({ open, onOpenChange, title, code }: TransactionDrawerTypes) {
    const option = title === "Create";
    const drawerDesc = option
        ? "Add transactions."
        : "Update your transaction information.";

    const { data } = useQuery({
        queryKey: ["category", code],
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
            swipeDirection="right"
            disablePointerDismissal={!isSaving}
        >
            <DrawerContent className="w-3/12">
                <DrawerHeader>
                    <DrawerTitle className="font-semibold">{title} Transaction</DrawerTitle>
                    <DrawerDescription>{drawerDesc}</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 h-full">
                    <TransactionForm
                        onClose={() => onOpenChange(false)}
                        dataTrans={data}
                        mode={option ? "create" : "update" }
                        setIsSaving={setIsSaving}
                    />
                </div>
            </DrawerContent>
        </Drawer>
    );
}