"use client";

import { Button } from "@/components/ui/button";
import { Building2, CircleUser, Pencil, Plus, Search, Settings } from "lucide-react";
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
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/use-debounce";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";

export function FinanceBookPage() {
    const isMobile = useIsMobile();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [selectedCode, setSelectedCode] = useState<FinanceBookParams>();
    const [searchName, setSearchName] = useState("");
    const [typeFilter, setTypeFilter] = useState("");

    const debouncedName = useDebounce(searchName);

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
        queryKey: ["financeBooks", debouncedName, typeFilter],
        queryFn: () => getFinanceBook(debouncedName, typeFilter)
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
                    <Badge className={cn("opacity-80", row.type === "PERSONAL" ? "bg-success" : "bg-info", isMobile ? "text-xs" : "text-sm")}>
                        {row.type === "PERSONAL" ? <CircleUser /> : <Building2 />}
                        {row.type}
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
                                            router.push(`/finance-book/${row.code}/transaction`);
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
        <section className="flex flex-col gap-4 h-full">
            <div className="px-4 py-5 rounded-sm bg-white flex flex-col gap-3 lg:flex-row">
                <div className="h-full flex flex-col gap-2 md:flex-row lg:flex-1">
                    <Field orientation={isMobile ? "vertical" : "horizontal"}>
                        <FieldLabel className="text-text-caption">Filter</FieldLabel>
                        <InputGroup className="h-12 rounded-sm">
                            <InputGroupInput
                                type="text"
                                id="search-name"
                                placeholder="Search name..."
                                onChange={(e) => setSearchName(e.target.value)}
                                className={isMobile ? "text-xs" : "text-sm"}
                            />
                            <InputGroupAddon align="inline-end">
                                <Search />
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>
                    <Field>
                        <Select
                            items={typeBooks}
                            value={typeFilter}
                            onValueChange={(value) => setTypeFilter(value ?? "")}
                        >
                            <SelectTrigger className={cn("h-full py-6 rounded-sm", isMobile ? "text-xs" : "text-sm")}>
                                <SelectValue placeholder="Choose Type" />
                            </SelectTrigger>
                            <SelectContent alignItemWithTrigger={false}>
                                <SelectGroup className="space-y-1">
                                    <SelectItem
                                        value=""
                                        className={isMobile ? "text-xs" : "text-sm"}
                                    >
                                        Choose Type
                                    </SelectItem>
                                    {typeBooks.map((item) => (
                                        <SelectItem
                                            key={item.value}
                                            value={item.value}
                                            label={item.label}
                                            className={isMobile ? "text-xs" : "text-sm"}
                                        >
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Field>
                </div>
                <div className="flex justify-end items-center xl:flex-1">
                    <Button
                        size="lg"
                        className="rounded-sm w-full lg:w-auto lg:h-full"
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
            <div className="flex-2 h-full bg-white rounded-sm">
                <div className="flex-2 px-4">
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
            </div>
        </section>
    );
}