"use client";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { ChevronUp, ClipboardList, LucideArrowDownCircle, LucideArrowUpCircle, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CustomDialog } from "@/components/dialog";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/use-debounce";
import { SkeletonTable } from "@/components/skeletonTable";
import { Input } from "@/components/ui/input";
import { TransactionDrawer } from "./components/drawer";
import { useParams } from "next/navigation";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { CustomTable } from "@/components/table";
import { getTransaction } from "@/services/transaction.service";
import { Column } from "@/types/table";
import { TransactionTypes } from "./types/transaction";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTransactionSocket } from "@/hooks/useTransactionSocket";

export function TransactionPage() {
    const { code } = useParams<{ code: string }>(); 
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [searchCode, setSearchCode] = useState("");
    const [searchName, setSearchName] = useState("");
    const [title, setTitle] = useState("");
    const [selectedCode, setSelectedCode] = useState("");

    // const debouncedCode = useDebounce(searchCode, 500);
    // const debouncedName = useDebounce(searchName, 500);

    const { data, isLoading } = useQuery({
        queryKey: ["category"],
        queryFn: () => getTransaction()
    });

    const columns: Column<TransactionTypes>[] = [
        {
            key: "createdAt",
            title: "Date",
            className: "font-bold"
        },
        {
            key: "name",
            title: "Name",
            className: "font-bold"
        },
        {
            key: "type",
            title: "Type",
            className: "font-bold"
        },
        {
            key: "categoryCode",
            title: "Category",
            className: "font-bold"
        },
        {
            key: "walletCode",
            title: "Wallet",
            className: "font-bold"
        },
        {
            key: "contactCode",
            title: "Contact",
            className: "font-bold"
        },
        {
            key: "Amount",
            title: "Total",
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
                                Update Transaction
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
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
                                Delete Transaction
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </>
            )
        },
    ];

    // const deleteMutation = useMutation({
    //     mutationFn: deleteCategory,
    //     onSuccess: (res) => {
    //         toast.success(res.message);

    //         queryClient.invalidateQueries({
    //             queryKey: ["category"]
    //         });

    //         setOpenDialog(false);
    //     },
    //     onError: (error) => {
    //         toast.error(error.message);
    //     }
    // });

    // const handleDelete = async () => {
    //     if(!selectedCode) return;

    //     deleteMutation.mutate(selectedCode);
    // }

    useTransactionSocket();

    return (
        <section className="flex flex-col gap-4 h-full">
            <div className="px-4 py-5 rounded-sm bg-white flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
                <div className="flex flex-col gap-1.5 md:flex-row">
                    <Field>
                        <Input className="h-12 rounded-sm" type="date" id="start-date" />
                    </Field>
                    <Field>
                        <Input className="h-12 rounded-sm" type="date" id="end-date" />
                    </Field>
                </div>
                <div>
                    <Button
                        size="lg"
                        className="rounded-sm w-full"
                        onClick={() => {
                            setTitle("Create")
                            setSelectedCode("")
                            setOpen(true);
                        }}
                    >
                        <Plus data-icon="inline-start" />
                        Add Transaction
                    </Button>
                </div>
            </div>
            <div className="bg-white flex flex-col gap-2 px-4 py-5 rounded-sm sm:flex-row">
                <div className="flex-1">
                    <Item className="bg-success/10 border-success/40">
                        <ItemMedia variant="icon" className="bg-success/80 rounded-full p-2 text-white">
                            <LucideArrowUpCircle />
                        </ItemMedia>
                        <ItemContent
                            className="flex flex-row justify-between items-center"
                        >
                            <div className="space-y-1">
                                <ItemTitle className="text-xs font-semibold">Total Income</ItemTitle>
                                <ItemDescription className="text-md">Rp100.000.000,00</ItemDescription>
                            </div>
                            <div>
                                <div className="flex flex-row justify-end items-center ">
                                    <ChevronUp className="text-success" />
                                    <ItemDescription className="font-bold">12%</ItemDescription>
                                </div>
                                <div>
                                    <ItemDescription className="text-xs text-end">Vs previous period</ItemDescription>
                                </div>
                            </div>
                        </ItemContent>
                    </Item>
                </div>
                <div className="flex-1 rounded-sm">
                    <Item className="bg-danger/10 border-danger/40">
                        <ItemMedia variant="icon" className="bg-danger/80 rounded-full p-2 text-white">
                            <LucideArrowDownCircle />
                        </ItemMedia>
                        <ItemContent
                            className="flex flex-row justify-between items-center"
                        >
                            <div className="space-y-1">
                                <ItemTitle className="text-xs font-semibold">Total Expense</ItemTitle>
                                <ItemDescription className="text-md">Rp50.000.000,00</ItemDescription>
                            </div>
                            <div>
                                <div className="flex flex-row justify-end items-center ">
                                    <ChevronUp className="text-danger" />
                                    <ItemDescription className="font-bold">10%</ItemDescription>
                                </div>
                                <div>
                                    <ItemDescription className="text-xs text-end">Vs previous period</ItemDescription>
                                </div>
                            </div>
                        </ItemContent>
                    </Item>
                </div>
            </div>
            <div className="flex-4 bg-white rounded-sm">
                <div className="px-4 py-5 flex flex-col gap-4">
                    <div className="flex flex-row gap-2 items-center">
                        <ClipboardList></ClipboardList>
                        <p className="font-semibold">Transaction Lists</p>
                    </div>
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
            </div>

            <TransactionDrawer
                open={open}
                onOpenChange={setOpen}
                title={title}
                code={selectedCode}
                bookCode={code}
            />
            {/* <CustomDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                title="Delete Confirmation"
                subtitle={selectedCode}
                description="Data will permanent deleted and cannot be retrive."
                onConfirm={""}
            /> */}
        </section>
    );
}