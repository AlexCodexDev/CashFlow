import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { TagDrawerTypes } from "../types/drawerTypes";
import { useState } from "react";
import { TagForm } from "./form";
import { useQuery } from "@tanstack/react-query";
import { getTagByCode } from "@/services/tag.service";

export function TagDrawer({ open, onOpenChange, title, code }: TagDrawerTypes) {
    const option = title === "Create";
    const drawerDesc = option
        ? "Add a new tag to organize your transactions."
        : "Update your tag information.";
        
    const { data } = useQuery({
        queryKey: ["tag", code],
        queryFn: () => getTagByCode(code!),
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
                    <DrawerTitle className="font-semibold">{title} Tag</DrawerTitle>
                    <DrawerDescription>{drawerDesc}</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 h-full">
                    <TagForm
                        onClose={() => onOpenChange(false)}
                        dataTag={data}
                        mode={option ? "create" : "update"}
                        setIsSaving={setIsSaving}    
                    />
                </div>
            </DrawerContent>
        </Drawer>
    );
}