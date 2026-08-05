"use client";

import { Button } from "@/components/ui/button";
import { Building2, CircleUser, Pencil, Plus, Settings } from "lucide-react";
import { useState } from "react";
import { CustomTable } from "@/components/table";
import { Column } from "@/types/table";
import { useQuery } from "@tanstack/react-query";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SkeletonTable } from "@/components/skeletonTable";
import { getFinanceBook } from "@/services/finance-book.service";
import { FinanceBookTypes } from "./types/financeBookTypes";
import { useFinanceBookSocket } from "@/hooks/useFinanceBookSocket";
import { FinanceBookDrawer } from "./components/drawer";
import { FinanceBookParams } from "@/schemas/financeBook.schema";
import { Badge } from "@/components/ui/badge";
import { Field, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCategory } from "@/services/category.service";
import { CategoryTypes } from "../category/types/category";

export function FinanceBookPage() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [selectedCode, setSelectedCode] = useState<FinanceBookParams>();
    const [typeFilter, setTypeFilter] = useState("");

    const typeBooks = [
        {
            label: "Personal",
            value: "PERSONAL"
        },
        {
            label: "Bussiness",
            value: "BUSSINESS"
        }
    ]

    const { data, isLoading } = useQuery({
        queryKey: ["financeBooks"],
        queryFn: () => getFinanceBook()
    });

    const columns: Column<FinanceBookTypes>[] = [
        {
            key: "code",
            title: "Code",
            className: "font-bold"
        },
        {
            key: "type",
            title: "Type",
            className: "font-bold",
            render: (row) => (
                <>
                    <Badge className="opacity-70">
                        {row.type === "PERSONAL" ? <CircleUser /> : <Building2 />}
                        {row.type.charAt(0) + row.type.slice(1).toLowerCase()}
                    </Badge>
                </>
            )
        },
        {
            key: "name",
            title: "Name",
            className: "font-bold"
        },
        {
            key: "description",
            title: "Description",
            className: "font-bold",
            render: (row) => (
                row.description || "-"
            )
        },
        {
            key: "actions",
            title: "Actions",
            className: "text-right font-bold",
            render: (row) => (
                <>
                    <div className="space-x-1 text-right">
                        <Tooltip>
                            <TooltipTrigger
                                render={
                                    <Button
                                        variant="ghost"
                                        size="icon-lg"
                                        onClick={() => {
                                            setTitle("Update");
                                            setSelectedCode({code: row.code});
                                            setOpen(true);
                                        }}
                                        className="transition-colors duration-200 ease-out hover:bg-warning/20"
                                    >
                                        <Pencil className="text-warning" />
                                    </Button>
                                }
                            />
                            <TooltipContent>
                                Update Finance Book
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger
                                render={
                                    <Button
                                        variant="ghost"
                                        size="icon-lg"
                                        onClick={() => {
                                            setSelectedCode({code: row.code});
                                            // setOpenDialog(true);
                                        }}
                                        className="transition-colors duration-200 ease-out hover:bg-text-body/20"
                                    >
                                        <Settings className="text-text-body" />
                                    </Button>
                                }
                            />
                            <TooltipContent>
                                Manage Transaction
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </>
            )
        },
    ];

    useFinanceBookSocket();

    return (
        <section className="w-full h-full bg-white rounded-md">
            <div className="flex-1 px-10 py-7 flex justify-between">
                <div className="flex gap-1.5">
                    <Field className="w-45" orientation="horizontal">
                        <FieldLabel className="text-text-caption">Filter</FieldLabel>
                        
                    </Field>
                    <Field className="w-45" orientation="horizontal">
                        <FieldLabel className="text-text-caption">Filter</FieldLabel>
                        <Select items={typeBooks}>
                            <SelectTrigger className="w-full rounded-sm">
                                <SelectValue placeholder="Choose Type" />
                            </SelectTrigger>
                            <SelectContent alignItemWithTrigger={false}>
                                <SelectGroup className="space-y-1">
                                    <SelectItem value="">Choose Type</SelectItem>
                                    {typeBooks.map((item) => (
                                        <SelectItem key={item.value} value={item.value} label={item.label}>
                                        {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Field>
                </div>
                <div>
                    <Button
                        size="lg"
                        className="rounded-sm"
                        onClick={() => {
                            setTitle("Create")
                            setSelectedCode({code: ""})
                            setOpen(true);
                        }}
                    >
                        <Plus data-icon="inline-start" />
                        Add Finance Book
                    </Button>
                </div>
            </div>
            <div className="flex-2 px-10">
                {isLoading ? (
                    <SkeletonTable />
                ) : (
                    <CustomTable
                        columns={columns}
                        data={data ?? []}
                        rowKey="code"
                    />
                )}
            </div>

            <FinanceBookDrawer
                open={open}
                onOpenChange={setOpen}
                title={title}
                code={selectedCode}
            />
        </section>
    );
}