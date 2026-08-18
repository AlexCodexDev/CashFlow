"use client";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TransactionDialogTypes } from "../types/dialogTypes";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { WalletFormData, WalletSchema } from "@/schemas/wallet.schema";
import { Textarea } from "@/components/ui/textarea";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import { createWallet } from "@/services/wallet.service";
import { NumberInput } from "@/lib/input-number";
import { useEffect } from "react";

export function WalletDialog({ open, onOpenChange, bookCode }: TransactionDialogTypes) {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: async (data: WalletFormData) => {
            return createWallet(data);
        },
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                queryKey: ["wallet"]
            });

            toast.success(res.message);
            form.reset();
            onOpenChange(false);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const form = useForm<WalletFormData>({
        resolver: zodResolver(WalletSchema),
        values: {
            name: "",
            financeBookCode: bookCode,
            openingBalance: 0,
            currentBalance: 0,
            isActive: true,
        }
    });

    const onSubmit = async (data: WalletFormData) => {
        createMutation.mutate(data);
    }

    const openingBalanceWatch = useWatch({
        control: form.control,
        name: "openingBalance"
    });

    useEffect(() => {
        form.setValue('currentBalance', openingBalanceWatch ?? 0);
    }, [openingBalanceWatch, form.setValue]);

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="sm:max-w-sm">
                <form
                    onSubmit={form.handleSubmit(onSubmit, (errors) => (console.log(errors)))}
                >
                    <DialogHeader>
                        <DialogTitle className="font-semibold">Add Wallet</DialogTitle>
                        <DialogDescription>
                            Add wallet to manage your income and expense transactions.
                        </DialogDescription>
                    </DialogHeader>
                    <Separator className="mt-4" />
                    <FieldSet className="my-4">
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
                            <Controller
                                control={form.control}
                                name="openingBalance"
                                render={({ field }) => (
                                    <Field>
                                        <FieldLabel htmlFor="openingBalance">Opening Balance <span className="text-danger">*</span></FieldLabel>
                                        <InputGroup className="h-12">
                                            <InputGroupAddon align="inline-start">
                                                Rp
                                            </InputGroupAddon>
                                            <NumberInput
                                                id="openingBalance"
                                                placeholder="Enter opening balance..."
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </InputGroup>
                                    </Field>
                                )}
                            />
                            <Controller
                                control={form.control}
                                name="currentBalance"
                                render={({ field }) => (
                                    <Field>
                                        <FieldLabel htmlFor="currentBalance">Current Balance <span className="text-danger">*</span></FieldLabel>
                                        <InputGroup className="h-12">
                                            <InputGroupAddon align="inline-start">
                                                Rp
                                            </InputGroupAddon>
                                            <NumberInput
                                                id="currentBalance"
                                                placeholder="Enter current balance..."
                                                value={field.value}
                                                onChange={field.onChange}
                                                disabled
                                            />
                                        </InputGroup>
                                    </Field>
                                )}
                            />
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
                    <DialogFooter>
                        <DialogClose
                            render={
                                <Button
                                    variant="outline" 
                                    onClick={() => {
                                        onOpenChange(false);
                                        form.reset();
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