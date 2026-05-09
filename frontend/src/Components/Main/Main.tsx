import MainSidebar from "./MainSidebar.tsx";
import MainContent from "./MainContent.tsx";
export default function Main() {
    return(
        <div className="flex h-screen overflow-hidden">
            <MainSidebar />
            <div className="flex-1 overflow-y-auto">
                <MainContent />
            </div>
        </div>
    );
}