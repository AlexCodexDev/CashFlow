"use client";

import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CategoryIconField } from "./iconField";
import { CategoryColorField } from "./colorField";
import { CategoryFieldPreview } from "./preview";
import { Button } from "@/components/ui/button";
import { Controller, useForm, useWatch } from "react-hook-form";
import { CategoryFormData, CategorySchema } from "@/schemas/category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryFormTypes } from "../types/formTypes";
import { toast } from "sonner";
import { createCategory, updateCategory } from "@/services/category.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function CategoryForm({ dataCat, isCreate, bookCode, onClose }: CategoryFormTypes) {
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
            form.reset();
            onClose();
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
            data: CategoryFormData
        }) => updateCategory(code, data),
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                queryKey: ["Category"]
            });
            
            toast.success(res.message);
            form.reset();
            onClose();
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    const form = useForm<CategoryFormData>({
        resolver: zodResolver(CategorySchema),
        values: {
            name: dataCat?.name ?? "",
            financeBookCode: dataCat?.financeBookCode ?? bookCode,
            description: dataCat?.description ?? "",
            icon: dataCat?.icon ?? "",
            color: dataCat?.color ?? "",
            isActive: true,
        }
    });

    const onSubmit = async (data: CategoryFormData) => {
        if (isCreate) {
            createMutation.mutate(data);
        } else {
            updateMutation.mutate({
                code: dataCat.code,
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
            id="category-form"
            onSubmit={form.handleSubmit(onSubmit, (error) => console.log(error))}
            className="w-full space-y-3"
        >
            <Separator />
            <div className="flex-1 overflow-y-auto px-1">
                <FieldSet>
                    <FieldGroup>
                        <Controller
                            control={form.control}
                            name="name"
                            render={({ field, fieldState }) => 
                                <Field>
                                    <FieldLabel htmlFor="name">Name <span className="text-danger">*</span></FieldLabel>
                                    <Input
                                        id="name"
                                        autoComplete="off"
                                        required
                                        placeholder="Enter name..."
                                        className="h-12 text-sm md:text-md"
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                    <FieldError
                                        className="text-danger"
                                        errors={[fieldState.error]}
                                    />
                                </Field>
                            }
                        />
                        <Field>
                            <FieldLabel htmlFor="description">Description <span className="text-text-caption">(Optional)</span></FieldLabel>
                            <Textarea
                                id="description"
                                placeholder="Enter description..."
                                className="h-26 text-sm md:text-md"
                                {...form.register("description")}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="icon">Icon <span className="text-text-caption">(Optional)</span></FieldLabel>
                            <FieldDescription>Mark category with icon</FieldDescription>
                            <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
                                <CategoryIconField
                                    value={icon}
                                    onValueChange={(value) => form.setValue("icon", value)}
                                />
                            </div>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="color">Color <span className="text-text-caption">(Optional)</span></FieldLabel>
                            <FieldDescription>Mark category with color</FieldDescription>
                            <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
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
                        </Field>
                    </FieldGroup>
                </FieldSet>
            </div>
        </form>
    );
}