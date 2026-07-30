import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PaymentDrawerTypes } from "../types/drawerTypes";
import { getPaymentByCode } from "@/services/payment.service";
import { PaymentForm } from "./form";

export function PaymentDrawer({ open, onOpenChange, title, code }: PaymentDrawerTypes) {
    const option = title === "Create";
    const drawerDesc = option
        ? "Add a new payment to organize your transactions."
        : "Update your payment information.";

    const { data } = useQuery({
        queryKey: ["payment", code],
        queryFn: () => getPaymentByCode(code!),
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
                    <DrawerTitle className="font-semibold">{title} Payment</DrawerTitle>
                    <DrawerDescription>{drawerDesc}</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 h-full">
                    <PaymentForm
                        onClose={() => onOpenChange(false)}
                        dataPay={data}
                        mode={option ? "create" : "update" }
                        setIsSaving={setIsSaving}
                    />
                </div>
            </DrawerContent>
        </Drawer>
    );
}