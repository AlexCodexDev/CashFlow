import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { TransactionDrawerTypes } from "../types/drawerTypes";
import { TransactionForm } from "./form";
import { getTransactionByCode } from "@/services/transaction.service";

export function TransactionDrawer({ open, onOpenChange, title, code, bookCode }: TransactionDrawerTypes) {
    const option = title === "Create";
    const drawerDesc = option
        ? "Add transactions."
        : "Update your transaction information.";

    const { data } = useQuery({
        queryKey: ["transactions", code],
        queryFn: () => getTransactionByCode(code!),
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
                <div className="px-3 py-4 h-full">
                    <TransactionForm
                        onClose={() => onOpenChange(false)}
                        dataTrans={data}
                        mode={option ? "create" : "update" }
                        setIsSaving={setIsSaving}
                        bookCode={bookCode}
                        code={code || ""}
                    />
                </div>
            </DrawerContent>
        </Drawer>
    );
}