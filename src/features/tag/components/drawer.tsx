import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { TagDrawerTypes } from "../types/drawerTypes";
import { useState } from "react";

export function TagDrawer({ open, onOpenChange, title, code }: TagDrawerTypes) {
    const option = title === "Create";
    const drawerDesc = option
        ? "Add a new tag to organize your transactions."
        : "Update your tag information.";
    const [isSaving, setIsSaving] = useState(false);

    return (
        <Drawer
            open={open}
            onOpenChange={(value) => {
                onOpenChange(value);
            }}
            swipeDirection="right"
            disablePointerDismissal={!isSaving}
        >
            <DrawerContent className="w-3/12">
                <DrawerHeader>
                    <DrawerTitle className="font-semibold">{title} Tag</DrawerTitle>
                    <DrawerDescription>{drawerDesc}</DrawerDescription>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    );
}