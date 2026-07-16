import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import AppSidebarMenu from "./AppSidebarMenu";
import Image from "next/image";

export default function AppSidebar() {
    return(
        <>
            <Sidebar>
                <SidebarHeader>
                    <Image
                        src="/images/logoCashflow.webp"
                        alt="CashFlow Logo"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="h-17 w-auto"
                        style={{ objectFit: "cover" }}
                        priority
                    />
                </SidebarHeader>
                <SidebarContent>
                    <AppSidebarMenu />
                </SidebarContent>
                <SidebarFooter>
                    <p className="text-text-caption">Version 1.0.0</p>
                </SidebarFooter>
            </Sidebar>
        </>
    );
}