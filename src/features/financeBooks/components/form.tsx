"use client";

import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldSet, FieldTitle } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { FinanceBookFormTypes } from "../types/formTypes";
import { FinanceBookBody, FinanceBookParams, FinanceBookSchema } from "@/schemas/financeBook.schema";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createFinanceBook, updateFinanceBook } from "@/services/finance-book.service";

export function FinanceBookForm({ onClose, dataFB, mode, setIsSaving }: FinanceBookFormTypes) {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: async (data: FinanceBookBody) => {
            setIsSaving(true);
            return createFinanceBook(data);
        },
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                queryKey: ["financeBooks"]
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

    const updateMutation = useMutation({
        mutationFn: ({
            code,
            data
        }: {
            code: FinanceBookParams,
            data: FinanceBookBody
        }) => updateFinanceBook(code, data),
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                queryKey: ["financeBooks"]
            });
            
            toast.success(res.message);
            form.reset();
            onClose();
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const form = useForm<FinanceBookBody>({
        resolver: zodResolver(FinanceBookSchema),
        values: {
            name: dataFB?.name ?? "",
            description: dataFB?.description ?? "",
            type: dataFB?.type ?? "PERSONAL"
        }
    });

    const onSubmit = async (data: FinanceBookBody) => {
        if (mode === "create") {
            createMutation.mutate(data);
        } else {
            updateMutation.mutate({
                code: { code: dataFB.code },
                data
            });
        }
    };

    const type = useWatch({
        control: form.control,
        name: "type"
    });
    
    return (
        <form
            onSubmit={form.handleSubmit(onSubmit, (errors) => (console.log(errors)))}
            className="flex h-full flex-col"
        >
            <div className="flex-1 overflow-y-auto">
                <FieldSet>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="name">Type <span className="text-danger">*</span></FieldLabel>
                            <RadioGroup
                                defaultValue="plus"
                                className="max-w-sm"
                                value={type}
                                onValueChange={(value) => form.setValue("type", value)}
                            >
                                <FieldLabel htmlFor="plus-plan">
                                    <Field orientation="horizontal">
                                    <FieldContent>
                                        <FieldTitle>Personal</FieldTitle>
                                        <FieldDescription>
                                            Manage your personal transactions.
                                        </FieldDescription>
                                    </FieldContent>
                                    <RadioGroupItem value="PERSONAL" id="personal" />
                                    </Field>
                                </FieldLabel>
                                <FieldLabel htmlFor="pro-plan">
                                    <Field orientation="horizontal">
                                    <FieldContent>
                                        <FieldTitle>Bussiness</FieldTitle>
                                        <FieldDescription>
                                            Manage your bussiness transactions.
                                        </FieldDescription>
                                    </FieldContent>
                                    <RadioGroupItem value="BUSSINESS" id="bussiness" />
                                    </Field>
                                </FieldLabel>
                            </RadioGroup>
                        </Field>
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
                        <Field>
                            <FieldLabel htmlFor="logo">Logo <span className="text-text-caption">(Optional)</span></FieldLabel>
                            <Input type="file" id="logo" className="h-12" />
                        </Field>
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