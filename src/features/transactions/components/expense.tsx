import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpCircleIcon } from "lucide-react";

export function ExpensePage() {
    return (
        <Card className="bg-danger text-background">
            <CardHeader className="flex items-center gap-3">
                <div>
                    <ArrowUpCircleIcon />
                </div>
                <div>
                    <CardTitle>Total Expense</CardTitle>
                    <CardDescription className="font-semibold text-xl text-background">Rp 100.000.000</CardDescription>
                </div>
            </CardHeader>
        </Card>
    );
}