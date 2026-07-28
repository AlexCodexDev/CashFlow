"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

import type { SidebarItemTypes } from "@/types/sidebar";
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useEffect, useState } from "react";

interface Props {
  item: SidebarItemTypes;
}

export default function AppSidebarItem({ item }: Props) {
  const pathName = usePathname();
  const active = pathName === item.href || !!item.children?.some((child) => pathName === child.href);
  const [open, setOpen] = useState(active);

  useEffect(() => {
    setOpen(active);
  }, [active]);

  if(!item.children) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          isActive={pathName === item.href}
          render={
            <Link href={item.href}>
              <item.icon className="size-5" />
              <span>{item.title}</span>
            </Link>
          }
        >

        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }  

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <SidebarMenuItem>
        <CollapsibleTrigger render={
          <SidebarMenuButton className="h-10">
            <item.icon className="size-5" />
            <span>{item.title}</span>

            {item.children && (
              <ChevronDown className="ml-auto size-4 transition-transform group-data-[state=open]:rotate-180" />
            )}  
          </SidebarMenuButton>
        }>
        </CollapsibleTrigger>

        {item.children && (
          <CollapsibleContent>
            <SidebarMenuSub className="space-y-1">
              {item.children.map((child) => (
                <SidebarMenuSubItem key={child.href}>
                  <SidebarMenuSubButton isActive={pathName === child.href} render={
                    <Link href={child.href}>
                      <child.icon className="size-4" />
                      <span>{child.title}</span>
                    </Link>
                  }>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        )}
      </SidebarMenuItem>
    </Collapsible>
  );
}