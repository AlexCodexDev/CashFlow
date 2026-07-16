import { ArrowDownCircle, ArrowUpCircle, BellRing, ChartColumn, FolderOpen, HandCoins, LayoutDashboard, PiggyBank, Wallet } from "lucide-react";
import type { SidebarItemTypes } from "@/types/sidebar";

export const sidebarMenus: SidebarItemTypes[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        description: "Welcome! Here's an overview of your financial activities."
    },
    {
        title: "Category",
        href: "/category",
        icon: FolderOpen,
        description: "Manage your income and expense categories."
    },
    {
        title: "Transactions",
        href: "/transactions",
        icon: Wallet,
        description: "",
        children: [
            {
                title: "Income",
                href: "/income",
                icon: ArrowDownCircle,
                description: "Manage all income transactions."
            },
            {
                title: "Expense",
                href: "/expense",
                icon: ArrowUpCircle,
                description: "Manage all expense transactions."
            }
        ]
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