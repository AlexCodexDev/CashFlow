"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <DashboardLayout>
            {children}
            <Toaster />
        </DashboardLayout>
    );
}