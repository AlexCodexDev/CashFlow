import { SidebarProvider } from "../ui/sidebar";
import { Footer } from "./Footer";
import { Header } from "./Header";
import Sidebar from "./sidebar/AppSidebar";

interface Props {
    children: React.ReactNode
}

export default function DashboardLayout({ children, }: Props) {
    return (
        <>
            <SidebarProvider>
                <div className="flex min-h-dvh min-w-dvw">
                    <Sidebar />

                    <div className="flex flex-1 flex-col px-5 min-w-0">
                        <Header />

                        <main className="flex-1 py-3">
                            {children}
                        </main>

                        <Footer />
                    </div>
                </div>
            </SidebarProvider>
        </>
    );
}