"use client";

import { usePathname } from "next/navigation";
import { SidebarMenu } from "../ui/sidebar";
import { sidebarMenus } from "@/constants/sidebar-menu";

export function Header() {
    const pathName = usePathname();
    const formatTitle = (text: string) => text.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    const title = formatTitle(pathName.split("/").filter(Boolean).pop() ?? "Dashboard");
    
    const findMenu = (menus: typeof sidebarMenus) => {
        for(const menu of menus) {
            if(menu.href === pathName) return menu;

            if(menu.children) {
                const child = menu.children.find(
                    (item) => item.href === pathName
                );

                if(child) return child;
            }
        }

        return null;
    }

    const currentMenu = findMenu(sidebarMenus);

    return (
        <>
            <header className="py-4">
                <h3 className="font-bold text-text-heading">{title}</h3>
                <p className="text-text-caption">{currentMenu?.description ?? "Welcome! Here's an overview of your financial activities."}</p>
            </header>
        </>
    );
}