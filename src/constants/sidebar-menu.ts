import { BellRing, ChartColumn, HandCoins, Landmark, LayoutDashboard, PiggyBank } from "lucide-react";
import type { SidebarItemTypes } from "@/types/sidebar";

export const sidebarMenus: SidebarItemTypes[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        description: "Welcome! Here's an overview of your financial activities."
    },
    {
        title: "Finance Book",
        href: "/finance-book",
        icon: Landmark,
        description: "Manage all income and expense transactions"
    },
    {
        title: "Budget",
        href: "/budget",
        icon: HandCoins,
        description: "Manage your budget."
    },
    {
        title: "Financial Goals",
        href: "/financial-goals",
        icon: PiggyBank,
        description: "Setup your goals."
    },
    {
        title: "Reminder",
        href: "/reminder",
        icon: BellRing,
        description: "Manage reminder."
    },
    {
        title: "Report",
        href: "/report",
        icon: ChartColumn,
        description: "See all transactions."
    },
]