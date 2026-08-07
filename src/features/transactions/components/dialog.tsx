"use client";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TransactionDialogTypes } from "../types/dialogTypes";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CategoryIconField } from "@/features/category/components/iconField";
import { CategoryColorField } from "@/features/category/components/colorField";
import { CategoryFieldPreview } from "@/features/category/components/preview";
import { useForm, useWatch } from "react-hook-form";
import { CategoryFormData, CategorySchema } from "@/schemas/category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "@/services/category.service";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { WalletFormData, WalletSchema } from "@/schemas/wallet.schema";

export function TransactionDialog({ open, onOpenChange, bookCode }: TransactionDialogTypes) {
    console.log(bookCode);
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: async (data: CategoryFormData) => {
            return createCategory(data);
        },
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                queryKey: ["category"]
            });

            toast.success(res.message);
            formCategory.reset();
            onOpenChange(false);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const formCategory = useForm<CategoryFormData>({
        resolver: zodResolver(CategorySchema),
        values: {
            name: "",
            financeBookCode: bookCode,
            icon: "",
            color: "",
            isActive: true,
        }
    });

    // const formWallet = useForm<WalletFormData>({
    //     resolver: zodResolver(WalletSchema),
    //     values: {
    //         name: "",

    //     }
    // })

    const onSubmit = async (data: CategoryFormData) => {
        createMutation.mutate(data);
    }

    const name = useWatch({
        control: formCategory.control,
        name: "name"
    });

    const icon = useWatch({
        control: formCategory.control,
        name: "icon"
    });

    const color = useWatch({
        control: formCategory.control,
        name: "color"
    });

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="sm:max-w-sm">
                <form
                    onSubmit={formCategory.handleSubmit(onSubmit, (errors) => (console.log(errors)))}
                >
                    <DialogHeader>
                        <DialogTitle className="font-semibold">Add Category</DialogTitle>
                        <DialogDescription>
                            Add category to manage your income and expense transactions.
                        </DialogDescription>
                    </DialogHeader>
                    <Separator className="mt-4" />
                    <FieldSet className="my-4">
                        <FieldGroup>
                            <Field>
                                <FieldLabel>Name <span className="text-danger">*</span></FieldLabel>
                                <Input
                                    id="name"
                                    autoComplete="off"
                                    required
                                    placeholder="Enter name..."
                                    className="h-12"
                                    {...formCategory.register("name")}
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="icon">Icon <span className="text-text-caption">(Optional)</span></FieldLabel>
                                <FieldDescription>Mark category with icon</FieldDescription>
                                <div className="grid grid-cols-5 gap-2">
                                    <CategoryIconField
                                        value={icon}
                                        onValueChange={(value) => formCategory.setValue("icon", value)}
                                    />
                                </div>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="color">Color <span className="text-text-caption">(Optional)</span></FieldLabel>
                                <FieldDescription>Mark category with color</FieldDescription>
                                <div className="grid grid-cols-5 gap-2">
                                    <CategoryColorField
                                        value={color}
                                        onValueChange={(value) => formCategory.setValue("color", value)}
                                    />
                                </div>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="preview">Preview</FieldLabel>
                                <FieldDescription>Preview your category setup</FieldDescription>
                                <div className="border-2 p-5 rounded-sm">
                                    <CategoryFieldPreview
                                        iconValue={icon}
                                        colorValue={color}
                                        categoryName={name}
                                    />
                                </div>
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                    <DialogFooter>
                        <DialogClose
                            render={
                                <Button
                                    variant="outline" 
                                    onClick={() => {
                                        onOpenChange(false);
                                        formCategory.reset();
                                    }}
                                    disabled={createMutation.isPending}
                                >
                                    Cancel
                                </Button>
                            } />
                        <Button
                            type="submit"
                            title="Submit"
                            disabled={createMutation.isPending}
                        >
                            {createMutation.isPending && (
                                <Loader2 className="size-4 animate-spin" />
                            )}
                            Submit
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}