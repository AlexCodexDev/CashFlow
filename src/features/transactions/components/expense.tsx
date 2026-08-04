import { CustomTable } from "@/components/table";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryTypes } from "@/features/category/types/category";
import { Column } from "@/types/table";
import { ArrowDownCircleIcon } from "lucide-react";

export function ExpensePage() {
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
            <Card className="bg-danger text-background">
                <CardHeader className="flex items-center gap-3">
                    <div>
                        <ArrowDownCircleIcon />
                    </div>
                    <div>
                        <CardTitle>Total Expense</CardTitle>
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