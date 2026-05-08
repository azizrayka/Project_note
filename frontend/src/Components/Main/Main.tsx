import MainSidebar from "./MainSidebar.tsx";
import MainContent from "./MainContent.tsx";
export default function Main() {
    return(
        <div className="flex">
            <MainSidebar />
            <MainContent />
        </div>
    );
}