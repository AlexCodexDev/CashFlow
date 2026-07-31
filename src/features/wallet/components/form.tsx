"use client";

import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { WalletFormTypes } from "../types/formTypes";
import { WalletFormData, WalletSchema } from "@/schemas/wallet.schema";
import { createWallet, updateWallet } from "@/services/wallet.service";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getOptions } from "@/services/payment.service";

export function WalletForm({ onClose, dataWal, mode, setIsSaving }: WalletFormTypes) {
    const queryClient = useQueryClient();

    const { data: dataSelect } = useQuery({
        queryKey: ["payment"],
        queryFn: () => getOptions()
    });

    const createMutation = useMutation({
        mutationFn: async (data: WalletFormData) => {
            setIsSaving(true);
            return createWallet(data);
        },
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                queryKey: ["wallet"]
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
            code: string,
            data: WalletFormData
        }) => updateWallet(code, data),
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                queryKey: ["wallet"]
            });
            
            toast.success(res.message);
            form.reset();
            onClose();
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    const form = useForm<WalletFormData>({
        resolver: zodResolver(WalletSchema),
        values: {
            name: dataWal?.name ?? "",
            paymentCode: dataWal?.payment.code ?? "",
            description: dataWal?.description ?? "",
            isActive: true,
        }
    });

    const onSubmit = async (data: WalletFormData) => {
        if (mode === "create") {
            createMutation.mutate(data);
        } else {
            updateMutation.mutate({
                code: dataWal.code,
                data
            });
        }
    };

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
                                placeholder="Enter name..."
                                required
                                className="h-12"
                                {...form.register("name")}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="payment">Payment <span className="text-danger">*</span></FieldLabel>
                            <Controller
                                control={form.control}
                                name="paymentCode"
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        items={dataSelect}
                                        required
                                    >
                                        <SelectTrigger className="w-45">
                                            <SelectValue>
                                                {dataSelect?.find((x: any) => x.code === field.value)?.name ?? "Choose Payment"}
                                            </SelectValue>
                                        </SelectTrigger>

                                        <SelectContent alignItemWithTrigger={false} className="p-2">
                                            <SelectGroup className="space-y-1">
                                                <SelectItem value="">-- Choose Payment --</SelectItem>
                                                {dataSelect?.map((item: any) => (
                                                    <SelectItem
                                                        key={item.code}
                                                        value={item.code}
                                                        label={item.name}
                                                        aria-label={item.name}
                                                    >
                                                        {item.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            >
                            </Controller>
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
                    </FieldGroup>
                </FieldSet>
            </div>

            <div className="flex flex-col justify-between gap-2">
                <Button
                    type="submit"
                    size="lg"
                    title="Submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                >
                    {(createMutation.isPending || updateMutation.isPending) && (
                        <Loader2 className="size-4 animate-spin" />
                    )}
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
                    disabled={createMutation.isPending || updateMutation.isPending}
                >Cancel</Button>
            </div>
        </form>
    );
}