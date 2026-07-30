import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { WalletDrawerTypes } from "../types/drawerTypes";
import { getWalletByCode } from "@/services/wallet.service";
import { WalletForm } from "./form";

export function WalletDrawer({ open, onOpenChange, title, code }: WalletDrawerTypes) {
    const option = title === "Create";
    const drawerDesc = option
        ? "Add a new wallet to organize your transactions."
        : "Update your wallet information.";

    const { data } = useQuery({
        queryKey: ["wallet", code],
        queryFn: () => getWalletByCode(code!),
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
                    <DrawerTitle className="font-semibold">{title} Wallet</DrawerTitle>
                    <DrawerDescription>{drawerDesc}</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 h-full">
                    <WalletForm
                        onClose={() => onOpenChange(false)}
                        dataWal={data}
                        mode={option ? "create" : "update" }
                        setIsSaving={setIsSaving}
                    />
                </div>
            </DrawerContent>
        </Drawer>
    );
}