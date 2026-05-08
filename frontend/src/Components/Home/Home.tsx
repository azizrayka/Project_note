import HomeSidebar from "./HomeSidebar.tsx";
import HomeContent from "./HomeContent.tsx";
import { useParams } from 'react-router-dom';
import {useState} from "react";

export default function Home() {
    const { user_id } = useParams<{ user_id: string }>();
    const userId = Number(user_id);
    const [searching, setSearching] = useState(false);
    return(
        <div className="flex h-screen overflow-hidden">
            <HomeSidebar setSearching={setSearching} />
            <div className="flex-1 overflow-y-auto">
                <HomeContent id={userId} searching={searching} />
            </div>
        </div>
    );
}