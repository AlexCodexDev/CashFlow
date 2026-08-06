import { socket } from "@/lib/socket";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export function useTransactionSocket() {
    const queryClient = useQueryClient()

    useEffect(() => {
        const handler = () => {
            queryClient.invalidateQueries({
                queryKey: ["transactions"]
            });
        }

        socket.on("transaction:changed", handler);

        return  () => {
            socket.off("transaction:changed", handler);
        }
    }, [queryClient]);
}