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
import { PaymentFormTypes } from "../types/formTypes";
import { PaymentFormData, PaymentSchema } from "@/schemas/payment.schema";
import { createPayment, updatePayment } from "@/services/payment.service";
import { PaymentIconField } from "./iconField";
import { PaymentColorField } from "./colorField";
import { PaymentFieldPreview } from "./preview";

export function PaymentForm({ onClose, dataPay, mode, setIsSaving }: PaymentFormTypes) {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: async (data: PaymentFormData) => {
            setIsSaving(true);
            return createPayment(data);
        },
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                queryKey: ["payment"]
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
            data: PaymentFormData
        }) => updatePayment(code, data),
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                queryKey: ["payment"]
            });
            
            toast.success(res.message);
            form.reset();
            onClose();
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    const form = useForm<PaymentFormData>({
        resolver: zodResolver(PaymentSchema),
        values: {
            name: dataPay?.name ?? "",
            color: dataPay?.color ?? "",
            icon: dataPay?.icon ?? "",
            description: dataPay?.description ?? "",
            isActive: true,
        }
    });

    const onSubmit = async (data: PaymentFormData) => {
        if (mode === "create") {
            createMutation.mutate(data);
        } else {
            updateMutation.mutate({
                code: dataPay.code,
                data
            });
        }
    };

    const name = useWatch({
        control: form.control,
        name: "name"
    });

    const icon = useWatch({
        control: form.control,
        name: "icon"
    });

    const color = useWatch({
        control: form.control,
        name: "color"
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
                            <FieldLabel htmlFor="description">Description <span className="text-text-caption">(Optional)</span></FieldLabel>
                            <Textarea
                                id="description"
                                placeholder="Enter description..."
                                className="h-26"
                                {...form.register("description")}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="icon">Icon <span className="text-text-caption">(Optional)</span></FieldLabel>
                            <FieldDescription>Mark payment with icon</FieldDescription>
                            <div className="grid grid-cols-5 gap-2">
                                <PaymentIconField
                                    value={icon}
                                    onValueChange={(value) => form.setValue("icon", value)}
                                />
                            </div>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="color">Color <span className="text-text-caption">(Optional)</span></FieldLabel>
                            <FieldDescription>Mark payment with color</FieldDescription>
                            <div className="grid grid-cols-5 gap-2">
                                <PaymentColorField
                                    value={color}
                                    onValueChange={(value) => form.setValue("color", value)}
                                />
                            </div>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="preview">Preview</FieldLabel>
                            <FieldDescription>Preview your payment setup</FieldDescription>
                            <div className="border-2 p-5 rounded-sm">
                                <PaymentFieldPreview
                                    iconValue={icon}
                                    colorValue={color}
                                    paymentName={name}
                                />
                            </div>
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