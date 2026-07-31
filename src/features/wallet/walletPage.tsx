"use client";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { CustomTable } from "@/components/table";
import { Column } from "@/types/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CustomDialog } from "@/components/dialog";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/use-debounce";
import { SkeletonTable } from "@/components/skeletonTable";
import { WalletTypes } from "./types/wallet";
import { deleteWallet, getWallet } from "@/services/wallet.service";
import { useWalletSocket } from "@/hooks/useWalletSocket";
import { WalletDrawer } from "./components/drawer";

export function WalletPage() {
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [searchCode, setSearchCode] = useState("");
    const [searchName, setSearchName] = useState("");
    const [title, setTitle] = useState("");
    const [selectedCode, setSelectedCode] = useState("");

    const debouncedCode = useDebounce(searchCode, 500);
    const debouncedName = useDebounce(searchName, 500);

    const { data, isLoading } = useQuery({
        queryKey: ["wallet", debouncedCode, debouncedName],
        queryFn: () => getWallet(debouncedCode, debouncedName)
    });

    const columns: Column<WalletTypes>[] = [
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
            key: "paymentCode",
            title: "Payment",
            className: "font-bold",
            render: (row) => (
                row.payment?.name || "-"
            )
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
                                Update Wallet
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
                                Delete Wallet
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </>
            )
        },
    ];

    const deleteMutation = useMutation({
        mutationFn: deleteWallet,
        onSuccess: (res) => {
            toast.success(res.message);

            queryClient.invalidateQueries({
                queryKey: ["wallet"]
            });

            setOpenDialog(false);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const handleDelete = async () => {
        if(!selectedCode) return;

        deleteMutation.mutate(selectedCode);
    }

    useWalletSocket();

    return (
        <section className="w-full h-full bg-white rounded-md">
            <div className="flex-1 px-10 py-7 flex justify-between">
                <div className="flex gap-1.5">
                    <Field>
                        <InputGroup className="h-12 rounded-sm">
                            <InputGroupInput
                                type="text"
                                id="search-code-wallet"
                                placeholder="Search wallet code..."
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
                                id="search-name-wallet"
                                placeholder="Search wallet name..."
                                onChange={(e) => setSearchName(e.target.value)}
                            />
                            <InputGroupAddon align="inline-end">
                                <Search />
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>
                </div>
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
                        Add Wallet
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

            <WalletDrawer
                open={open}
                onOpenChange={setOpen}
                title={title}
                code={selectedCode}
            />
            <CustomDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                title="Delete Confirmation"
                subtitle={selectedCode}
                description="Data will permanent deleted and cannot be retrive."
                onConfirm={handleDelete}
            />
        </section>
    );
}