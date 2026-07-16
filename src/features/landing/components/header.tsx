import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Menu } from "lucide-react";

export function Header() {
    return (
        <>
            <section className="flex-1 h-full">
                <div className="w-full hidden lg:flex lg:justify-between">
                    <div>LOGO</div>
                    <div>
                        <Button variant="link" className="text-text-body hover:text-primary-hover">Home</Button>
                        <Button variant="link" className="text-text-body hover:text-primary-hover">Feature</Button>
                        <Button variant="link" className="text-text-body hover:text-primary-hover">Advantage</Button>
                        <Button variant="link" className="text-text-body hover:text-primary-hover">Testimoni</Button>
                        <Button variant="link" className="text-text-body hover:text-primary-hover">FAQ</Button>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="px-10 py-2">Login</Button>
                        <Button className="px-10">Register</Button>
                    </div>
                </div>

                <div className="w-full flex justify-between lg:hidden">
                    <div>LOGO</div>
                    <Drawer swipeDirection="left">
                        <DrawerTrigger render={<Button variant="secondary"><Menu /></Button>} />
                        <DrawerContent>
                            <div className="w-full h-full flex flex-col gap-3 pt-6">
                                <Button variant="link" className="text-text-body hover:text-primary-hover text-lg">Home</Button>
                                <Button variant="link" className="text-text-body hover:text-primary-hover text-lg">Feature</Button>
                                <Button variant="link" className="text-text-body hover:text-primary-hover text-lg">Advantage</Button>
                                <Button variant="link" className="text-text-body hover:text-primary-hover text-lg">Testimoni</Button>
                                <Button variant="link" className="text-text-body hover:text-primary-hover text-lg">FAQ</Button>
                            </div>
                            <DrawerFooter>
                                <div className="flex gap-2 flex-col">
                                    <Button variant="outline" className="px-10 py-2">Login</Button>
                                    <Button className="px-10">Register</Button>
                                </div>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </div>
            </section>
        </>
    );
}