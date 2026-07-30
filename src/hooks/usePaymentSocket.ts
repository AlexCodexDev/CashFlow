import { socket } from "@/lib/socket";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export function usePaymentSocket() {
    const queryClient = useQueryClient()

    useEffect(() => {
        const handler = () => {
            queryClient.invalidateQueries({
                queryKey: ["payment"]
            });
        }

        socket.on("payment:changed", handler);

        return  () => {
            socket.off("payment:changed", handler);
        }
    }, [queryClient]);
}