import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { TransactionDrawerTypes } from "../types/drawerTypes";
import { TransactionForm } from "./form";
import { getTransactionByCode } from "@/services/transaction.service";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

export function TransactionDrawer({ open, onOpenChange, title, code, bookCode }: TransactionDrawerTypes) {
    const isMobile = useIsMobile();

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
            swipeDirection={isMobile ? "down" : "right"}
            disablePointerDismissal={!isSaving}
        >
            <DrawerContent className="w-full md:w-3/12">
                <DrawerHeader>
                    <DrawerTitle className="font-semibold">{title} Transaction</DrawerTitle>
                    <DrawerDescription>{drawerDesc}</DrawerDescription>
                </DrawerHeader>
                <div className="px-3 py-4 h-full overflow-y-auto">
                    <TransactionForm
                        onClose={() => onOpenChange(false)}
                        dataTrans={data}
                        mode={option ? "create" : "update" }
                        setIsSaving={setIsSaving}
                        bookCode={bookCode}
                        code={code || ""}
                    />
                </div>
                <DrawerFooter>
                    <Button
                        type="submit"
                        form="transaction-form"
                        title="Submit"
                    >
                        Submit
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        title="Cancel"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}