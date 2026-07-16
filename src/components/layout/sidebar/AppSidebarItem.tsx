"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import type { SidebarItemTypes } from "@/types/sidebar";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

interface Props {
  item: SidebarItemTypes;
}

export default function AppSidebarItem({ item }: Props) {
  const pathName = usePathname();
  const active = pathName === item.href || pathName.startsWith(`${item.href}/`);

  return (
    <div className="space-y-1">
      <SidebarMenuItem>
        <SidebarMenuButton
          isActive={active}
          className="h-10"
          render={
            <Link href={item.href}>
              <item.icon className="size-5" />
              <span>{item.title}</span>

              {item.children && (
                <ChevronDown className={cn(
                  "size-4 transition-transform duration-200",
                  active && "rotate-180"
                )} />
              )}
            </Link>
            }
        >  
        </SidebarMenuButton>
      </SidebarMenuItem>
    </div>
  );
}