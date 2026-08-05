"use client";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Pencil, Plus, Search, Settings, Trash2 } from "lucide-react";
import { useState } from "react";
import { CustomTable } from "@/components/table";
import { Column } from "@/types/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CustomDialog } from "@/components/dialog";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/use-debounce";
import { SkeletonTable } from "@/components/skeletonTable";
import { getFinanceBook } from "@/services/finance-book.service";
import { FinanceBookTypes } from "./types/financeBookTypes";
import { useFinanceBookSocket } from "@/hooks/useFinanceBookSocket";
import { FinanceBookDrawer } from "./components/drawer";

export function FinanceBookPage() {
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [title, setTitle] = useState("");
    const [selectedCode, setSelectedCode] = useState("");

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
                                            setSelectedCode(row.code);
                                            setOpen(true);
                                        }}
                                        className="transition-colors duration-200 ease-out hover:bg-warning/20"
                                    >
                                        <Pencil className="text-warning" />
                                    </Button>
                                }
                            />
                            <TooltipContent>
                                Update Category
                            </TooltipContent>
                        </Tooltip>
                        {/* <Tooltip>
                            <TooltipTrigger
                                render={
                                    <Button
                                        variant="ghost"
                                        size="icon-lg"
                                        onClick={() => {
                                            setSelectedCode(row.code);
                                            setOpenDialog(true);
                                        }}
                                        className="transition-colors duration-200 ease-out hover:bg-danger/20"
                                    >
                                        <Trash2 className="text-danger" />
                                    </Button>
                                }
                            />
                            <TooltipContent>
                                Delete Category
                            </TooltipContent>
                        </Tooltip> */}
                        <Tooltip>
                            <TooltipTrigger
                                render={
                                    <Button
                                        variant="ghost"
                                        size="icon-lg"
                                        onClick={() => {
                                            setSelectedCode(row.code);
                                            // setOpenDialog(true);
                                        }}
                                        className="transition-colors duration-200 ease-out hover:bg-danger/20"
                                    >
                                        <Settings className="text-danger" />
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
            <div className="flex-1 px-10 py-7 flex justify-end">
                {/* <div className="flex gap-1.5">
                    <Field>
                        <InputGroup className="h-12 rounded-sm">
                            <InputGroupInput
                                type="text"
                                id="search-code-category"
                                placeholder="Search category code..."
                                onChange={(e) => setSearchCode(e.target.value)}
                            />
                            <InputGroupAddon align="inline-end">
                                <Search />
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>
                    <Field>
                        <InputGroup className="h-12 rounded-sm">
                            <InputGroupInput
                                type="text"
                                id="search-name-category"
                                placeholder="Search category name..."
                                onChange={(e) => setSearchName(e.target.value)}
                            />
                            <InputGroupAddon align="inline-end">
                                <Search />
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>
                </div> */}
                <div>
                    <Button
                        size="lg"
                        className="rounded-sm"
                        onClick={() => {
                            setTitle("Create")
                            setSelectedCode("")
                            setOpen(true);
                        }}
                    >
                        <Plus data-icon="inline-start" />
                        Add finance Books
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
            {/* <CustomDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                title="Delete Confirmation"
                subtitle={selectedCode}
                description="Data will permanent deleted and cannot be retrive."
                onConfirm={handleDelete}
            /> */}
        </section>
    );
}