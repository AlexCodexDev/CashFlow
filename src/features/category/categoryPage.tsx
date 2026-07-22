"use client";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Pencil, Plus, Search, Trash2, Utensils } from "lucide-react";
import { CategoryDrawer } from "./components/drawer";
import { useState } from "react";
import { CustomTable } from "@/components/table";
import { CategoryTypes } from "./types/category";
import { Column } from "@/types/table";
import { useQuery } from "@tanstack/react-query";
import { getCategory } from "@/services/category.service";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CategoryFieldPreview } from "./components/preview";

export function CategoryPage() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [selectedCode, setSelectedCode] = useState("");
    const { data, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategory
    });

    const columns: Column<CategoryTypes>[] = [
        {
            key: "code",
            title: "Code",
            className: "font-bold"
        },
        {
            key: "name",
            title: "Name",
            className: "font-bold",
            render: (row) => (
                <>
                    <CategoryFieldPreview
                        iconValue={row.icon || "Utensils"}
                        colorValue={row.color || "bg-background"}
                        categoryName={row.name}
                        bgSize="h-10 w-10"
                        iconSize="size-4"
                        textSize="text-md font-normal"
                    />
                </>
            )

        },
        {
            key: "description",
            title: "Description",
            className: "font-bold",
            render: (row) => (
                row.description || "-"
            )
        },
        {
            key: "actions",
            title: "Actions",
            className: "text-right font-bold",
            render: (row) => (
                <>
                    <div className="space-x-1 text-right">
                        <Tooltip>
                            <TooltipTrigger
                                render={
                                    <Button
                                        variant="ghost"
                                        size="icon-lg"
                                        onClick={() => {
                                            setOpen(true);
                                            setTitle("Update")
                                            setSelectedCode(row.code)
                                        }}
                                        className="transition-colors duration-200 ease-out hover:bg-warning/20"
                                    >
                                        <Pencil className="text-warning" />
                                    </Button>
                                }
                            />
                            <TooltipContent>
                                Update Category
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger
                                render={
                                    <Button
                                        variant="ghost"
                                        size="icon-lg"
                                        className="transition-colors duration-200 ease-out hover:bg-danger/20"
                                    >
                                        <Trash2 className="text-danger" />
                                    </Button>
                                }
                            />
                            <TooltipContent>
                                Delete Category
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </>
            )
        },
    ];

    return (
        <section className="w-full h-full bg-white rounded-md">
            <div className="flex-1 px-10 py-7 flex justify-between">
                <div>
                    <Field>
                        <InputGroup className="h-12 rounded-sm">
                            <InputGroupInput
                                type="text"
                                id="search-category"
                                placeholder="Search category..."
                            />
                            <InputGroupAddon align="inline-end">
                                <Search />
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>
                </div>
                <div>
                    <Button
                        size="lg"
                        className="rounded-sm"
                        onClick={() => {
                            setOpen(true);
                            setTitle("Create")
                        }}
                    >
                        <Plus data-icon="inline-start" />
                        Add Category
                    </Button>
                </div>
            </div>
            <div className="flex-2 px-10">
                <CustomTable
                    columns={columns}
                    data={data ?? []}
                    rowKey="code"
                />
            </div>

            <CategoryDrawer
                open={open}
                onOpenChange={setOpen}
                title={title}
                code={selectedCode}
            />
        </section>
    );
}