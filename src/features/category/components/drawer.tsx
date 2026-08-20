import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import type { CategoryDrawerTypes } from "../types/drawerTypes";
import { CustomTable } from "@/components/table";
import { TransactionTypes } from "@/features/transactions/types/transaction";
import { Column } from "@/types/table";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Funnel, Pencil, Plus, Trash2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCategory, getCategoryByFinanceCode } from "@/services/category.service";
import { useState } from "react";
import { CategoryCrudDialog } from "./dialog";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SkeletonTable } from "@/components/skeletonTable";
import { toast } from "sonner";
import { CustomDialog } from "@/components/dialog";
import { CategoryFieldPreview } from "./preview";
import { CategoryTypes } from "../types/category";
import { useCategorySocket } from "@/hooks/useCategorySocket";
import { useDebounce } from "@/hooks/use-debounce";

export function CategoryDrawer({ open, onOpenChange, code }: CategoryDrawerTypes) {
    const queryClient = useQueryClient();
    const isMobile = useIsMobile();

    const [selectedCode, setSelectedCode] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [title, setTitle] = useState("");
    const [searchCode, setSearchCode] = useState("");
    const [searchName, setSearchName] = useState("");

    const debouncedCode = useDebounce(searchCode, 500);
    const debouncedName = useDebounce(searchName, 500);

    const { data, isLoading } = useQuery({
        queryKey: ["category", code, debouncedCode, debouncedName],
        queryFn: () => getCategoryByFinanceCode(code, debouncedCode, debouncedName)
    });

    const columns: Column<CategoryTypes>[] = [
        {
            key: "code",
            title: "Code",
            className: "font-bold"
        },
        {
            key: "name",
            title: "Name",
            className: "font-bold",
            render: (row) => (
                <CategoryFieldPreview
                    iconValue={row.icon || "Utensils"}
                    colorValue={row.color || "bg-background"}
                    categoryName={row.name}
                    bgSize="h-10 w-10"
                    iconSize="size-4"
                    textSize="text-md font-normal"
                />
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
                    <div className="text-right">
                        <Tooltip>
                            <TooltipTrigger
                                render={
                                    <Button
                                        variant="ghost"
                                        size="icon-lg"
                                        onClick={() => {
                                            setTitle("Update");
                                            setSelectedCode(row.code);
                                            setOpenDialog(true);
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
                        <Tooltip>
                            <TooltipTrigger
                                render={
                                    <Button
                                        variant="ghost"
                                        size="icon-lg"
                                        onClick={() => {
                                            setSelectedCode(row.code);
                                            setOpenDeleteDialog(true);
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
                        </Tooltip>
                    </div>
                </>
            )
        },
    ];

    const deleteMutation = useMutation({
        mutationFn: deleteCategory,
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                queryKey: ["category"]
            });

            toast.success(res.message);
            setOpenDeleteDialog(false);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const handleDelete = async () => {
        if(!selectedCode) return;
        deleteMutation.mutate(selectedCode);
    }

    useCategorySocket();

    return (
        <>
            <Drawer
                open={open}
                onOpenChange={(value) => {
                    onOpenChange(value);
                }}
                swipeDirection={isMobile ? "down" : "right"}
                showSwipeHandle={isMobile}
            >
                <DrawerContent className="w-full h-full md:w-5/12">
                    <DrawerHeader className="flex flex-row justify-between">
                        <div>
                            <DrawerTitle className="font-semibold">Manage Category</DrawerTitle>
                            <DrawerDescription>Manage your transaction with category.</DrawerDescription>
                        </div>
                        <div>
                            <Tooltip>
                                <TooltipTrigger
                                    render={
                                        <Button
                                            type="button"
                                            size="icon-lg"
                                            onClick={() => {
                                                setTitle("Create");
                                                setOpenDialog(true);
                                            }}
                                        >
                                            <Plus />
                                        </Button>
                                    }
                                />
                                <TooltipContent>
                                    <p>Add Category</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </DrawerHeader>
                    <div className="p-4 h-full space-y-2">
                        <FieldSet>
                            <FieldGroup>
                                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:items-end">
                                    <Field>
                                        <FieldLabel>Search Code</FieldLabel>
                                        <Input
                                            type="text"
                                            id="searchCode"
                                            autoComplete="off"
                                            className="h-12 text-sm md:text-md"
                                            placeholder="Enter code..."
                                            onChange={(e) => setSearchCode(e.target.value)}
                                        />
                                    </Field>
                                    <Field>
                                        <FieldLabel>Search Name</FieldLabel>
                                        <Input
                                            type="text"
                                            id="searchName"
                                            autoComplete="off"
                                            className="h-12 text-sm md:text-md"
                                            placeholder="Enter name..."
                                            onChange={(e) => setSearchName(e.target.value)}
                                        />
                                    </Field>
                                </div>
                            </FieldGroup>
                        </FieldSet>

                        {isLoading ? (
                            <SkeletonTable />
                        ) : (
                            <CustomTable
                                columns={columns}
                                data={data}
                                rowKey="code"
                            />
                        )}
                    </div>
                    <DrawerFooter>
                        <DrawerClose render={<Button variant="outline">Close</Button>} />
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <CategoryCrudDialog
                open={openDialog}
                onOpenChange={setOpenDialog}
                title={title}
                code={selectedCode}
                bookCode={code}
            />
            <CustomDialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                title="Delete Confirmation"
                subtitle={selectedCode}
                description="Data will permanent deleted and cannot be retrive."
                onConfirm={handleDelete}
            />
        </>
    );
}