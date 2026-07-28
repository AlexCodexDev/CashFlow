"use client";

import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TagColorField } from "./colorField";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TagFormData, TagSchema } from "@/schemas/tag.schema";
import { TagFormTypes } from "../types/formTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTag } from "@/services/tag.service";
import { toast } from "sonner";
import { updateCategory } from "@/services/category.service";

export function TagForm({onClose, dataTag, mode, setIsSaving}: TagFormTypes) {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: async (data: TagFormData) => {
            setIsSaving(true);
            return createTag(data);
        },
        onSuccess: (res) => {
            toast.success(res.message);

            queryClient.invalidateQueries({
                queryKey: ["tag"]
            });

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
            data: TagFormData
        }) => updateCategory(code, data),
        onSuccess: (res) => {
            toast.success(res.message);

            queryClient.invalidateQueries({
                queryKey: ["tag"]
            });

            form.reset();
            onClose();
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    const onSubmit = async (data: TagFormData) => {
        if(mode === "create") {
            createMutation.mutate(data);
        } else {
            updateMutation.mutate({
                code: dataTag.code,
                data
            });
        }
    }

    const form = useForm<TagFormData>({
        resolver: zodResolver(TagSchema),
        values: {
            name: dataTag?.name ?? "",
            description: dataTag?.description ?? "",
            color: dataTag?.color ?? "",
            isActive: true
        }
    });

    const name = useWatch({
        control: form.control,
        name: "name"
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
                            <FieldLabel htmlFor="name">Name</FieldLabel>
                            <Input
                                id="name"
                                autoComplete="off"
                                placeholder="Enter name..."
                                className="h-12"
                                {...form.register("name")}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="description">Description</FieldLabel>
                            <Textarea
                                id="description"
                                placeholder="Enter description..."
                                className="h-26"
                                {...form.register("description")}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="color">Color</FieldLabel>
                            <FieldDescription>Mark tag with color</FieldDescription>
                            <div className="grid grid-cols-5 gap-2">
                                <TagColorField value={color} onValueChange={(value) => form.setValue("color", value)} />
                            </div>
                        </Field>
                    </FieldGroup>
                </FieldSet>
            </div>

            
        </form>
    );
}