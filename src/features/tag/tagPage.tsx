"use client";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Column } from "@/types/table";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { TagTypes } from "./types/tag";
import { TagFieldPreview } from "./components/preview";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SkeletonTable } from "@/components/skeletonTable";
import { useQuery } from "@tanstack/react-query";
import { CustomTable } from "@/components/table";
import { getTag } from "@/services/tag.service";
import { TagDrawer } from "./components/drawer";

export function TagPage() {
    const [open, setOpen] = useState(false);

    const [searchCode, setSearchCode] = useState("");
    const [searchName, setSearchName] = useState("");
    const [title, setTitle] = useState("");
    const [selectedCode, setSelectedCode] = useState("");

    const { data, isLoading } = useQuery({
        queryKey: ["tag"],
        queryFn: () => getTag()
    });

    const columns: Column<TagTypes>[] = [
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
                    <TagFieldPreview
                        colorValue={row.color || "bg-background"}
                        tagName={row.name}
                        bgSize="h-10 w-10"
                        textSize="text-md font-normal"
                    />
                </>
            )
        },
        {
            key: "description",
            title: "Description",
            className: "font-bold",
            render: (row) => {
                row.description || "-"
            }
        },
        {
            key: "action",
            title: "Actions",
            className: "text-right font-bold",
            render: (row) => (
                <div className="space-x-1 text-right">
                    <Tooltip>
                        <TooltipTrigger
                            render={
                                <Button
                                    variant="ghost"
                                    size="icon-lg"
                                    onClick={() => {
                                        setTitle("Update");
                                        setSelectedCode(row.code);
                                        setOpen(true);
                                    }}
                                    className="transition-colors duration-200 ease-out hover:bg-warning/20"
                                >
                                    <Pencil className="text-warning" />
                                </Button>
                            }
                        />
                        <TooltipContent>
                            Update Tag
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger
                            render={
                                <Button
                                    variant="ghost"
                                    size="icon-lg"
                                    onClick={() => {
                                        setSelectedCode(row.code);
                                        setOpen(true);
                                    }}
                                    className="transition-colors duration-200 ease-out hover:bg-danger/20"
                                >
                                    <Trash2 className="text-danger" />
                                </Button>
                            }
                        />
                        <TooltipContent>
                            Delete Tag
                        </TooltipContent>
                    </Tooltip>
                </div>
            )
        }
    ];

    return (
        <section className="w-full h-full bg-white rounded-md">
            <div className="flex-1 px-10 py-7 flex justify-between">
                <div className="flex gap-1.5">
                    <Field>
                        <InputGroup className="h-12 rounded-sm">
                            <InputGroupInput
                                type="text"
                                id="search-code-tag"
                                placeholder="Search tag code..."
                                onChange={(e) => setSearchCode(e.target.value)}
                            />
                            <InputGroupAddon align="inline-end">
                                <Search />
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>
                    <Field>
                        <InputGroup className="h-12 rounded-sm">
                            <InputGroupInput
                                type="text"
                                id="search-name-tag"
                                placeholder="Search tag name..."
                                onChange={(e) => setSearchName(e.target.value)}
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
                            setTitle("Create")
                            setSelectedCode("")
                            setOpen(true);
                        }}
                    >
                        <Plus data-icon="inline-start" />
                        Add Tag
                    </Button>
                </div>
            </div>
            <div className="flex-2 px-10">
                {isLoading ? (
                    <SkeletonTable />
                ) : (
                    <CustomTable
                        columns={columns}
                        data={data ?? []}
                        rowKey="code"
                    />
                )}
            </div>

            <TagDrawer
                open={open}
                onOpenChange={setOpen}
                title={title}
                code={selectedCode}
            />
            {/* <CustomDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                title="Delete Confirmation"
                subtitle={selectedCode}
                description="Data will permanent deleted and cannot be retrive."
                onConfirm={handleDelete}
            /> */}
        </section>
    )
}