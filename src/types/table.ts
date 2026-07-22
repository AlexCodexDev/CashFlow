export interface Column<T> {
    key: keyof T | string;
    title: string;
    className?: string;
    render?: (row: T, index: Number) => React.ReactNode;
}

export interface CustomTableProps<T> {
    columns: Column<T>[];
    data: T[];
    rowKey: keyof T;
}