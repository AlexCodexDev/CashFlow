import { socket } from "@/lib/socket";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export function useCategorySocket() {
    const queryClient = useQueryClient()

    useEffect(() => {
        const handler = () => {
            queryClient.invalidateQueries({
                queryKey: ["category"]
            });
        }

        socket.on("category:changed", handler);

        return  () => {
            socket.off("category:changed", handler);
        }
    }, [queryClient]);
}