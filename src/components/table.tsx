import { CustomTableProps } from "@/types/table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export function CustomTable<T>({ columns, data, rowKey }: CustomTableProps<T>) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {columns.map((column) => (
                        <TableHead
                            key={column.key.toString()}
                            className={column.className}
                        >
                            {column.title}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.length > 0 ? (
                    data.map((row, index) => (
                        <TableRow key={String(row[rowKey])}>
                            {columns.map((column) => (
                                <TableCell key={column.key.toString()}>
                                    {column.render
                                        ? column.render(row, index)
                                        : String(
                                            row[column.key as keyof T] ?? "-"
                                        )
                                    }
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell className="text-center" colSpan={columns.length}>
                            No Record Available
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}