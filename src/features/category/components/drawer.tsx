import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import type { CategoryDrawerTypes } from "../types/drawerTypes";
import { CustomTable } from "@/components/table";
import { TransactionTypes } from "@/features/transactions/types/transaction";
import { Column } from "@/types/table";

export function CategoryDrawer({ open, onOpenChange }: CategoryDrawerTypes) {
    const columns: Column<TransactionTypes>[] = [
        {
            key: "code",
            title: "Code",
            className: "font-bold"
        },
        {
            key: "name",
            title: "Name",
            className: "font-bold"
        },
        {
            key: "actions",
            title: "Actions",
            className: "text-right font-bold",
            render: (row) => (
                <>
                    <div className="space-x-1 text-right">
                        
                    </div>
                </>
            )
        },
    ];

    return (
        <Drawer
            open={open}
            onOpenChange={(value) => {
                onOpenChange(value);
            }}
            swipeDirection="right"
        >
            <DrawerContent className="w-3/12">
                <DrawerHeader>
                    <DrawerTitle className="font-semibold">Manage Category</DrawerTitle>
                    <DrawerDescription>Manage your transaction with category.</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 h-full">
                    <CustomTable
                        columns={columns}
                        data={[]}
                        rowKey="code"
                    />
                </div>
            </DrawerContent>
        </Drawer>
    );
}