import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpCircleIcon } from "lucide-react";
import { CustomTable } from "@/components/table";
import { Column } from "@/types/table";
import { CategoryTypes } from "@/features/category/types/category";

export function IncomePage() {
    const columns: Column<CategoryTypes>[] = [
        {
            key: "code",
            title: "Code",
            className: "font-bold",
            render: () => {
                "Testing"
            }
        },
        {
            key: "name",
            title: "Name",
            className: "font-bold",
            render: () => {
                "testing"
            }
        },
        {
            key: "description",
            title: "Description",
            className: "font-bold",
            render: () => (
                "Testing"
            )
        },
        {
            key: "actions",
            title: "Actions",
            className: "text-right font-bold",
            render: () => (
                "Testing"
            )
        },
    ];

    return (
        <div>
            <Card className="bg-success text-background">
                <CardHeader className="flex items-center gap-3">
                    <div>
                        <ArrowUpCircleIcon />
                    </div>
                    <div>
                        <CardTitle>Total Income</CardTitle>
                        <CardDescription className="font-semibold text-xl text-background">Rp 100.000.000</CardDescription>
                    </div>
                </CardHeader>
            </Card>
            <div className="mt-5 h-full">
                <CustomTable
                    columns={columns}
                    data={[]}
                    rowKey="code" />
            </div>
        </div>
    );
}