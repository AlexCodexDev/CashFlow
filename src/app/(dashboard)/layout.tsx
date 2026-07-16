"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import React, { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    );
}