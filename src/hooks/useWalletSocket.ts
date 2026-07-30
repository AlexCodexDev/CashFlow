import { socket } from "@/lib/socket";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export function useWalletSocket() {
    const queryClient = useQueryClient()

    useEffect(() => {
        const handler = () => {
            queryClient.invalidateQueries({
                queryKey: ["wallet"]
            });
        }

        socket.on("wallet:changed", handler);

        return  () => {
            socket.off("wallet:changed", handler);
        }
    }, [queryClient]);
}