import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Main } from "./components/main";

export function LandingPage() {
    return (
        <>
            <div className="h-full flex flex-col px-4 py-5 sm:px-4 sm:py-4 md:px-10 md:py-4 lg:px-20 lg:py-6">
                <Header />
                <Main />
                <Footer />
            </div>
        </>
    );
}