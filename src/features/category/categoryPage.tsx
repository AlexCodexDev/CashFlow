"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Plus, Search } from "lucide-react";
import { CategoryDrawer } from "./components/drawer";
import { CategoryTable } from "./components/table";
import { useState } from "react";

export function CategoryPage() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");

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
                <CategoryTable />
            </div>

            <CategoryDrawer
                open={open}
                onOpenChange={setOpen}
                title={title}
            />
        </section>
    );
}