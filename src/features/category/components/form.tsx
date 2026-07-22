"use client";

import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CategoryIconField } from "./iconField";
import { CategoryColorField } from "./colorField";
import { CategoryFieldPreview } from "./preview";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { CategoryFormData, CategorySchema } from "@/schemas/category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryFormTypes } from "../types/formTypes";
import { toast } from "sonner";
import { createCategory, updateCategory } from "@/services/category.service";

export function CategoryForm({ onClose, data, flag, code }: CategoryFormTypes) {
    const form = useForm<CategoryFormData>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            name: "",
            description: "",
            icon: "",
            color: "",
            isActive: true,
        }
    });

    const onSubmit = async (data: CategoryFormData) => {
        try {
            if(flag === "Create") {
                const res = await createCategory(data);
                toast.success(res.message);
            } else {
                const res = await updateCategory(code || "", data);
                toast.success(res.message);
            }

            form.reset();
            onClose();
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
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
                            ></Textarea>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="icon">Icon <span className="text-text-caption">(Optional)</span></FieldLabel>
                            <FieldDescription>Mark category with icon</FieldDescription>
                            <div className="grid grid-cols-5 gap-2">
                                <CategoryIconField
                                    value={form.watch("icon")}
                                    onValueChange={(value) => form.setValue("icon", value)}
                                />
                            </div>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="color">Color <span className="text-text-caption">(Optional)</span></FieldLabel>
                            <FieldDescription>Mark category with color</FieldDescription>
                            <div className="grid grid-cols-5 gap-2">
                                <CategoryColorField
                                    value={form.watch("color")}
                                    onValueChange={(value) => form.setValue("color", value)}
                                />
                            </div>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="preview">Preview</FieldLabel>
                            <FieldDescription>Preview your category setup</FieldDescription>
                            <div className="border-2 p-5 rounded-sm">
                                <CategoryFieldPreview
                                    iconValue={form.watch("icon")}
                                    colorValue={form.watch("color")}
                                    categoryName={form.watch("name")}
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
                >Submit</Button>
                <Button
                    variant="outline"
                    type="button"
                    size="lg"
                    title="Cancel"
                    onClick={() => {
                        onClose(),
                        form.reset()
                    }}
                >Cancel</Button>
            </div>
        </form>
    );
}