import { LucideIcon } from "lucide-react";

export interface SidebarItemTypes {
    title: string;
    href: string;
    icon: LucideIcon;
    description: string;
    children?: SidebarItemTypes[];
}