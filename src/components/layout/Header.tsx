"use client";

import { usePathname } from "next/navigation";
import { sidebarMenus } from "@/constants/sidebar-menu";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { useSidebar } from "../ui/sidebar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export function Header() {
    const isMobile = useIsMobile();
    const { toggleSidebar } = useSidebar();

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
            <header className="py-4 flex flex-row items-center">
                <div className="flex-4 text-start md:flex-1">
                    <h3 className="font-bold text-text-heading">{title}</h3>
                    <p className="text-text-caption">{currentMenu?.description ?? "Welcome! Here's an overview of your financial activities."}</p>
                </div>
                <div className={cn("flex-1 text-end", isMobile ? "block" : "hidden")}>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={toggleSidebar}
                    >
                        <Menu />
                    </Button>
                </div>
            </header>
        </>
    );
}