import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CategoryCrudDialogTypes } from "../types/dialogTypes";
import { CategoryForm } from "./form";
import { useQuery } from "@tanstack/react-query";
import { getCategoryByCode } from "@/services/category.service";
import { Button } from "@/components/ui/button";

export function CategoryCrudDialog({ open, onOpenChange, title, code, bookCode }: CategoryCrudDialogTypes) {
    const isCreate = title === "Create";

    const { data, isLoading } = useQuery({
        queryKey: ["category", code],
        queryFn: () => getCategoryByCode(code)
    });

    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {
                onOpenChange(value);
            }}

        >
            <DialogContent className="max-h-[95vh] overflow-hidden flex flex-col">
                <DialogHeader>
                    <DialogTitle>{title} category</DialogTitle>
                    <DialogDescription>
                        {title} category to manage your income and expense transaction.
                    </DialogDescription>
                </DialogHeader>
                <div className="min-h-0 flex-1 overflow-y-auto px-1 scrollbar-none">
                    <CategoryForm
                        onClose={() =>onOpenChange(false)}
                        dataCat={data}
                        isCreate={isCreate}
                        bookCode={bookCode}
                    />
                </div>
                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        title="Cancel"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        form="category-form"
                        title="Submit"
                    >
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}