"use client";

import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldSet, FieldTitle } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, PlusCircle } from "lucide-react";
import { TransactionFormTypes } from "../types/formTypes";
import { TransactionBody, TransactionBodySchema } from "@/schemas/transaction.schema";
import { createTransaction } from "@/services/transaction.service";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCategory } from "@/services/category.service";
import { CategoryTypes } from "@/features/category/types/category";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { getWallet } from "@/services/wallet.service";
import { TransactionDialog } from "./dialog";
import { useState } from "react";

export function TransactionForm({ onClose, dataTrans, mode, setIsSaving, bookCode }: TransactionFormTypes) {
    const queryClient = useQueryClient();
    
    const [open, setOpen] = useState(false);

    const { data: dataCategory } = useQuery({
        queryKey: ["category"],
        queryFn: () => getCategory()
    });

    const { data: dataWallet } = useQuery({
        queryKey: ["wallet"],
        queryFn: () => getWallet()
    });

    // const { data: dataContact } = useQuery({
    //     queryKey: ["contact"]
    // });

    // START: Check data
    const hasCategory = dataCategory?.length > 0;
    const hasWallet = dataWallet?.length > 0;
    // END: Check data

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
        <>
            <form
                onSubmit={form.handleSubmit(onSubmit, (errors) => (console.log(errors)))}
                className="flex h-full flex-col"
            >
                <div className="flex-1 overflow-y-auto">
                    <FieldSet>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="type">Type <span className="text-danger">*</span></FieldLabel>
                                <RadioGroup defaultValue="INCOME" className="max-w-sm">
                                    <FieldLabel htmlFor="income-plan">
                                        <Field orientation="horizontal">
                                        <FieldContent>
                                            <FieldTitle>Income</FieldTitle>
                                            <FieldDescription>
                                                Insert income transaction.
                                            </FieldDescription>
                                        </FieldContent>
                                        <RadioGroupItem value="INCOME" id="income-plan" />
                                        </Field>
                                    </FieldLabel>
                                    <FieldLabel htmlFor="expense-plan">
                                        <Field orientation="horizontal">
                                        <FieldContent>
                                            <FieldTitle>Expense</FieldTitle>
                                            <FieldDescription>
                                                Insert expense transaction.
                                            </FieldDescription>
                                        </FieldContent>
                                        <RadioGroupItem value="EXPENSE" id="expense-plan" />
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
                                <FieldLabel>Category <span className="text-danger">*</span></FieldLabel>
                                <div className="flex flex-row items-center justify-between gap-2">
                                    <Select items={dataCategory}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Choose Category" />
                                        </SelectTrigger>
                                        <SelectContent alignItemWithTrigger={false}>
                                            <SelectGroup className="px-3 py-2">
                                                {hasCategory ? (
                                                    dataCategory.map((item: CategoryTypes) => (
                                                        <SelectItem key={item.code} value={item.code} label={item.name}>
                                                            {item.name}
                                                        </SelectItem>
                                                    ))
                                                ) : (
                                                    <div className="flex items-center justify-between">
                                                        <p>Category is empty.</p>
                                                        <Tooltip>
                                                            <TooltipTrigger render={
                                                                <Button
                                                                    variant="outline"
                                                                    size="icon"
                                                                    className="transition-colors duration-300 bg-success/70 text-white hover:bg-success/90 hover:text-white"
                                                                    onClick={() => setOpen(true)}
                                                                >
                                                                    <PlusCircle />
                                                                </Button>
                                                            }>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Add Category</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </div>
                                                )}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {hasCategory && (
                                        <Tooltip>
                                            <TooltipTrigger render={
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="transition-colors duration-300 bg-success/70 text-white hover:bg-success/90 hover:text-white"
                                                    onClick={() => setOpen(true)}
                                                >
                                                    <PlusCircle />
                                                </Button>
                                            }>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Add Category</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    )}
                                </div>
                            </Field>
                            <Field>
                                <FieldLabel>Wallet <span className="text-danger">*</span></FieldLabel>
                                <div className="flex flex-row items-center justify-between gap-2">
                                    <Select items={dataWallet}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Choose Wallet" />
                                        </SelectTrigger>
                                        <SelectContent alignItemWithTrigger={false}>
                                            <SelectGroup className="px-3 py-2">
                                                {hasWallet ? (
                                                    dataWallet.map((item: CategoryTypes) => (
                                                        <SelectItem key={item.code} value={item.code} label={item.name}>
                                                            {item.name}
                                                        </SelectItem>
                                                    ))
                                                ) : (
                                                    <div className="flex items-center justify-between">
                                                        <p>Wallet is empty.</p>
                                                        <Tooltip>
                                                            <TooltipTrigger render={
                                                                <Button
                                                                    variant="outline"
                                                                    size="icon"
                                                                    className="transition-colors duration-300 bg-success/70 text-white hover:bg-success/90 hover:text-white"
                                                                >
                                                                    <PlusCircle />
                                                                </Button>
                                                            }>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Add Wallet</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </div>
                                                )}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {hasWallet && (
                                        <Tooltip>
                                            <TooltipTrigger render={
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="transition-colors duration-300 bg-success/70 text-white hover:bg-success/90 hover:text-white"
                                                >
                                                    <PlusCircle />
                                                </Button>
                                            }>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Add Wallet</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    )}
                                </div>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="amount">Amount <span className="text-danger">*</span></FieldLabel>
                                <Input
                                    type="number"
                                    id="amount"
                                    autoComplete="off"
                                    required
                                    placeholder="Enter amount..."
                                    className="h-12"
                                    {...form.register("amount")}
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
            <TransactionDialog
                open={open}
                onOpenChange={setOpen}
                bookCode={bookCode}
            />
        </>
    );
}