"use client";

import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { TransactionFormTypes } from "../types/formTypes";
import { TransactionBody, TransactionBodySchema } from "@/schemas/transaction.schema";
import { createTransaction } from "@/services/transaction.service";

export function TransactionForm({ onClose, dataTrans, mode, setIsSaving }: TransactionFormTypes) {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: async (data: TransactionBody) => {
            setIsSaving(true);
            return createTransaction(data);
        },
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                queryKey: ["transactions"]
            });
            
            toast.success(res.message);
            form.reset();
            onClose();
        },
        onSettled: () => {
            setIsSaving(false);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    // const updateMutation = useMutation({
    //     mutationFn: ({
    //         code,
    //         data
    //     }: {
    //         code: string,
    //         data: CategoryFormData
    //     }) => updateCategory(code, data),
    //     onSuccess: (res) => {
    //         queryClient.invalidateQueries({
    //             queryKey: ["Category"]
    //         });
            
    //         toast.success(res.message);
    //         form.reset();
    //         onClose();
    //     },
    //     onError: (error) => {
    //         toast.error(error.message);
    //     }
    // })

    const form = useForm<TransactionBody>({
        resolver: zodResolver(TransactionBodySchema),
        values: {
            categoryCode: dataTrans?.categoryCode ?? "",
            walletCode: dataTrans?.walletCode ?? "",
            contactCode: dataTrans?.contactCode ?? "",
            name: dataTrans?.name ?? "",
            type: dataTrans?.type ?? "",
            amount: dataTrans?.amount ?? "",
            description: dataTrans?.description ?? "",
            icon: dataTrans?.icon ?? "",
            color: dataTrans?.color ?? ""
        }
    });

    const onSubmit = async (data: TransactionBody) => {
        if (mode === "create") {
            createMutation.mutate(data);
        } else {
            // updateMutation.mutate({
            //     code: dataCat.code,
            //     data
            // });
        }
    };

    // const name = useWatch({
    //     control: form.control,
    //     name: "name"
    // });

    // const icon = useWatch({
    //     control: form.control,
    //     name: "icon"
    // });

    // const color = useWatch({
    //     control: form.control,
    //     name: "color"
    // });
    
    return (
        <form
            onSubmit={form.handleSubmit(onSubmit, (errors) => (console.log(errors)))}
            className="flex h-full flex-col"
        >
            <div className="flex-1 overflow-y-auto">
                <FieldSet>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="name">Name <span className="text-danger">*</span></FieldLabel>
                            <Input
                                id="name"
                                autoComplete="off"
                                required
                                placeholder="Enter name..."
                                className="h-12"
                                {...form.register("name")}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="description">Description <span className="text-text-caption">(Optional)</span></FieldLabel>
                            <Textarea
                                id="description"
                                placeholder="Enter description..."
                                className="h-26"
                                {...form.register("description")}
                            />
                        </Field>
                        {/* <Field>
                            <FieldLabel htmlFor="icon">Icon <span className="text-text-caption">(Optional)</span></FieldLabel>
                            <FieldDescription>Mark category with icon</FieldDescription>
                            <div className="grid grid-cols-5 gap-2">
                                <CategoryIconField
                                    value={icon}
                                    onValueChange={(value) => form.setValue("icon", value)}
                                />
                            </div>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="color">Color <span className="text-text-caption">(Optional)</span></FieldLabel>
                            <FieldDescription>Mark category with color</FieldDescription>
                            <div className="grid grid-cols-5 gap-2">
                                <CategoryColorField
                                    value={color}
                                    onValueChange={(value) => form.setValue("color", value)}
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
                        </Field> */}
                    </FieldGroup>
                </FieldSet>
            </div>

            <div className="flex flex-col justify-between gap-2">
                <Button
                    type="submit"
                    size="lg"
                    title="Submit"
                    // disabled={createMutation.isPending || updateMutation.isPending}
                >
                    {/* {(createMutation.isPending || updateMutation.isPending) && (
                        <Loader2 className="size-4 animate-spin" />
                    )} */}
                    Submit
                </Button>
                <Button
                    variant="outline"
                    type="button"
                    size="lg"
                    title="Cancel"
                    onClick={() => {
                        onClose(),
                        form.reset()
                    }}
                    // disabled={createMutation.isPending || updateMutation.isPending}
                >Cancel</Button>
            </div>
        </form>
    );
}