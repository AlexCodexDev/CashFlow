"use client";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CustomDialog } from "@/components/dialog";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/use-debounce";
import { SkeletonTable } from "@/components/skeletonTable";
import { IncomePage } from "./components/income";
import { ExpensePage } from "./components/expense";
import { Input } from "@/components/ui/input";
import { TransactionDrawer } from "./components/drawer";

export function TransactionPage() {
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [searchCode, setSearchCode] = useState("");
    const [searchName, setSearchName] = useState("");
    const [title, setTitle] = useState("");
    const [selectedCode, setSelectedCode] = useState("");

    const debouncedCode = useDebounce(searchCode, 500);
    const debouncedName = useDebounce(searchName, 500);

    // const { data, isLoading } = useQuery({
    //     queryKey: ["category", debouncedCode, debouncedName],
    //     queryFn: () => getCategory(debouncedCode, debouncedName)
    // });

    // const columns: Column<CategoryTypes>[] = [
    //     {
    //         key: "code",
    //         title: "Code",
    //         className: "font-bold"
    //     },
    //     {
    //         key: "name",
    //         title: "Name",
    //         className: "font-bold",
    //         render: (row) => (
    //             <>
    //                 <CategoryFieldPreview
    //                     iconValue={row.icon || "Utensils"}
    //                     colorValue={row.color || "bg-background"}
    //                     categoryName={row.name}
    //                     bgSize="h-10 w-10"
    //                     iconSize="size-4"
    //                     textSize="text-md font-normal"
    //                 />
    //             </>
    //         )

    //     },
    //     {
    //         key: "description",
    //         title: "Description",
    //         className: "font-bold",
    //         render: (row) => (
    //             row.description || "-"
    //         )
    //     },
    //     {
    //         key: "actions",
    //         title: "Actions",
    //         className: "text-right font-bold",
    //         render: (row) => (
    //             <>
    //                 <div className="space-x-1 text-right">
    //                     <Tooltip>
    //                         <TooltipTrigger
    //                             render={
    //                                 <Button
    //                                     variant="ghost"
    //                                     size="icon-lg"
    //                                     onClick={() => {
    //                                         setTitle("Update");
    //                                         setSelectedCode(row.code);
    //                                         setOpen(true);
    //                                     }}
    //                                     className="transition-colors duration-200 ease-out hover:bg-warning/20"
    //                                 >
    //                                     <Pencil className="text-warning" />
    //                                 </Button>
    //                             }
    //                         />
    //                         <TooltipContent>
    //                             Update Category
    //                         </TooltipContent>
    //                     </Tooltip>
    //                     <Tooltip>
    //                         <TooltipTrigger
    //                             render={
    //                                 <Button
    //                                     variant="ghost"
    //                                     size="icon-lg"
    //                                     onClick={() => {
    //                                         setSelectedCode(row.code);
    //                                         setOpenDialog(true);
    //                                     }}
    //                                     className="transition-colors duration-200 ease-out hover:bg-danger/20"
    //                                 >
    //                                     <Trash2 className="text-danger" />
    //                                 </Button>
    //                             }
    //                         />
    //                         <TooltipContent>
    //                             Delete Category
    //                         </TooltipContent>
    //                     </Tooltip>
    //                 </div>
    //             </>
    //         )
    //     },
    // ];

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

    // useCategorySocket();

    return (
        <section className="w-full h-full bg-white rounded-md">
            <div className="flex-1 px-10 py-7 flex justify-between">
                <div className="flex gap-1.5">
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
                        className="rounded-sm"
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
            <div className="p-10 grid grid-cols-2 gap-4">
                {/* <IncomePage /> */}
                {/* <ExpensePage /> */}
                {/* {isLoading ? (
                    <SkeletonTable />
                ) : (
                    <CustomTable
                        columns={columns}
                        data={data ?? []}
                        rowKey="code"
                    />
                )} */}
            </div>

            <TransactionDrawer
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
                onConfirm={""}
            /> */}
        </section>
    );
}