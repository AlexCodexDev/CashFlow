import { socket } from "@/lib/socket";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export function useTagSocket() {
    const queryClient = useQueryClient()

    useEffect(() => {
        const handler = () => {
            queryClient.invalidateQueries({
                queryKey: ["tag"]
            });
        }

        socket.on("tag:changed", handler);

        return  () => {
            socket.off("tag:changed", handler);
        }
    }, [queryClient]);
}