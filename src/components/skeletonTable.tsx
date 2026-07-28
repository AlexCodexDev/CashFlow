import { Table } from "lucide-react";
import { TableBody, TableCell, TableRow } from "./ui/table";
import { Skeleton } from "./ui/skeleton";

export function SkeletonTable() {
    return (
        <Table>
            <TableBody>
                {Array.from({ length: 8 }).map((_, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <Skeleton className="h-5 w-20" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-5 w-28" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-5 w-28" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-5 w-28" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-5 w-40" />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}