import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import type { CategoryDrawerTypes } from "../types/drawerTypes";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CategoryIconField } from "./iconField";
import { CategoryColorField } from "./colorField";
import { CategoryFieldPreview } from "./preview";
import { useState } from "react";

export function CategoryDrawer({ open, onOpenChange, title }: CategoryDrawerTypes) {
    const drawerDesc = title === "Create"
        ? "Add a new category to organize your transactions."
        : "Update your category information.";

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [selectedIcon, setSelectedIcon] = useState<string>("");
    const [selectedColor, setSelectedColor] = useState<string>("");

    

    return (
        <Drawer
            open={open}
            onOpenChange={onOpenChange}
            swipeDirection="right"
        >
            <DrawerContent className="w-3/12">
                <DrawerHeader>
                    <DrawerTitle className="font-semibold">{title} Category</DrawerTitle>
                    <DrawerDescription>{drawerDesc}</DrawerDescription>
                </DrawerHeader>
                <div className="p-4">
                    <FieldSet>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">Name <span className="text-danger">*</span></FieldLabel>
                                <Input
                                    id="name"
                                    autoComplete="off"
                                    placeholder="Enter name..."
                                    className="h-12"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="description">Description <span className="text-text-caption">(Optional)</span></FieldLabel>
                                <Textarea
                                    id="description"
                                    placeholder="Enter description..."
                                    className="h-26"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></Textarea>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="icon">Icon <span className="text-text-caption">(Optional)</span></FieldLabel>
                                <FieldDescription>Mark category with icon</FieldDescription>
                                <div className="grid grid-cols-5 gap-2">
                                    <CategoryIconField
                                        value={selectedIcon}
                                        onValueChange={setSelectedIcon}
                                    />
                                </div>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="color">Color <span className="text-text-caption">(Optional)</span></FieldLabel>
                                <FieldDescription>Mark category with color</FieldDescription>
                                <div className="grid grid-cols-5 gap-2">
                                    <CategoryColorField
                                        value={selectedColor}
                                        onValueChange={setSelectedColor}
                                    />
                                </div>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="preview">Preview</FieldLabel>
                                <FieldDescription>Preview your category setup</FieldDescription>
                                <div className="border-2 p-5 rounded-sm">
                                    <CategoryFieldPreview
                                        iconValue={selectedIcon}
                                        colorValue={selectedColor}
                                        categoryName={name}
                                    />
                                </div>
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                </div>
                <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}