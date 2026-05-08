import {UserIcon} from "@phosphor-icons/react";
import {useNavigate} from "react-router";

export default function MainSidebar() {
    const navigate = useNavigate();
    return(
        <>
            <div className="h-screen w-1/4">
                <div className="flex flex-col gap-5 p-4 items-center">
                    <span className={"text-[#203562] text-2xl font-bold"}>Notes App</span>
                </div>
                <hr className="border-[#203562] w-full mt-150 mb-6"/>
                <div className="flex flex-row gap-2">
                    <button className="flex flex-row gap-5 p-4 items-center w-3/4 m-auto border-2 border-[#203562] rounded-lg cursor-pointer"
                    onClick={() => navigate("/signin")}>
                        <UserIcon size={20} className={"bg-[#203562] text-white rounded-full p-2 size-10"}/>
                        <span className={"text-[#203562] text-2xl font-bold"}>Sign in</span>
                    </button>
                </div>
            </div>
        </>
    );
}