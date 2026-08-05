import { socket } from "@/lib/socket";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export function useFinanceBookSocket() {
    const queryClient = useQueryClient()

    useEffect(() => {
        const handler = () => {
            queryClient.invalidateQueries({
                queryKey: ["financeBook"]
            });
        }

        socket.on("financeBook:changed", handler);

        return  () => {
            socket.off("financeBook:changed", handler);
        }
    }, [queryClient]);
}