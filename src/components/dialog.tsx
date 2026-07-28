import { DialogTypes } from "@/types/dialog";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";

export function CustomDialog({ open, onClose, title, subtitle, description, onConfirm }: DialogTypes) {
    return (
        <Dialog
            open={open}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle
                        className="font-semibold"
                    >{title}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-1">
                    <p>Code: {subtitle}</p>
                    <p>{description}</p>
                </div>
                <DialogFooter className="sm:justify-start">
                    <Button type="button" className="bg-danger hover:bg-danger" onClick={onConfirm}>Delete</Button>
                    <DialogClose render={<Button type="button" variant="outline" onClick={onClose}>Close</Button>} />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}