import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpCircleIcon } from "lucide-react";

export function IncomePage() {
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
            <div className="transaction-lists">

            </div>
        </div>
    );
}