import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardCards } from "../constants/dashboard-card";
import { cn } from "@/lib/utils";

export function DashboardCard() {
    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {dashboardCards.map((item, index) => (
                    <Card
                        key={index}
                        className="border-0 shadow-sm/10"
                    >
                        <CardHeader>
                            <CardTitle className={cn(item.color, "font-bold")}>{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent
                            className="flex flex-col gap-2"
                        >
                            <h3>{item.amount}</h3>
                            <CardDescription>{item.description}</CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    );
}