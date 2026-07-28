"use client";

import { socket } from "@/lib/socket";
import React, { useEffect } from "react";

export function SocketProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        socket.connect();

        return () => {
            socket.disconnect();
        }
    }, []);

    return children;
}