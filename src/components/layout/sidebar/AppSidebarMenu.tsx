import { sidebarMenus } from "@/constants/sidebar-menu";
import AppSidebarItem from "./AppSidebarItem";
import { SidebarGroup, SidebarMenu } from "@/components/ui/sidebar";

export default function AppSidebarMenu() {
    return (
        <>
        <SidebarGroup>
            <SidebarMenu className="gap-2">
                {sidebarMenus.map((item) => (
                    <AppSidebarItem
                        key={item.href}
                        item={item}
                    />
                    ))}
            </SidebarMenu>
        </SidebarGroup>
        </>
    );
}