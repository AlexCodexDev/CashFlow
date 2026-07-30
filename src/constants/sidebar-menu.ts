import { ArrowDownCircle, ArrowUpCircle, BellRing, ChartColumn, CircleDollarSign, Contact, Database, FolderOpen, HandCoins, Landmark, LayoutDashboard, PiggyBank, Tag, Wallet } from "lucide-react";
import type { SidebarItemTypes } from "@/types/sidebar";

export const sidebarMenus: SidebarItemTypes[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        description: "Welcome! Here's an overview of your financial activities."
    },
    {
        title: "Master Data",
        href: "/master-data",
        icon: Database,
        description: "",
        children: [
            {
                title: "Category",
                href: "/master-data/category",
                icon: FolderOpen,
                description: "Manage your income and expense categories."
            },
            {
                title: "Tag",
                href: "/master-data/tag",
                icon: Tag,
                description: "Organize your transactions with custom tags."
            },
            {
                title: "Payment",
                href: "/master-data/payment",
                icon: CircleDollarSign,
                description: "Organize your transactions with custom payments."
            },
            {
                title: "Wallet",
                href: "/master-data/wallet",
                icon: Wallet,
                description: "Organize your transactions with custom wallets."
            },
            {
                title: "Contact",
                href: "/master-data/contact",
                icon: Contact,
                description: "Organize your transactions with custom contacts."
            }
        ]
    },
    {
        title: "Transactions",
        href: "/transactions",
        icon: Landmark,
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