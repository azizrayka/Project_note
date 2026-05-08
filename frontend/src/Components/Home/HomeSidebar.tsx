import {MagnifyingGlassIcon, NotebookIcon, PlugsIcon, UserIcon, XIcon} from "@phosphor-icons/react";
import {useState} from "react";
import {useNavigate} from "react-router";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import api from "../../api/axios";

interface HomeSidebarProps {
    setSearching?: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

export default function HomeSidebar({setSearching}: HomeSidebarProps) {
    const [current, setCurrent] = useState(true);
    const navigate = useNavigate();
    const logout = async () => {
        try {
            await api.post("/logout");
            localStorage.removeItem("token");
            localStorage.removeItem("user_id");
            localStorage.removeItem("user_name");
            navigate("/signin");
        } catch (err) {
            console.log(err);
        }
    }
    const name = localStorage.getItem("user_name");
    return (
        <>
            <div className="h-screen w-1/4">
                <div className="flex flex-col gap-5 p-4 items-center">
                    <span className={"text-[#203562] text-2xl font-bold"}>Notes App</span>
                    <button
                        className={"mt-10 font-bold bg-[#203562] text-white w-3/4 rounded-md px-5 py-2 flex gap-13 cursor-pointer"}
                    onClick={() => setSearching?.(false)}>
                        <NotebookIcon size={26}/><span>Notes</span></button>
                    <button
                        className={"font-bold bg-[#203562] text-white w-3/4 rounded-md px-5 py-2 flex gap-13 cursor-pointer"}
                    onClick={() => setSearching?.(true)}>
                        <MagnifyingGlassIcon size={26} weight="bold"/><span>Search</span></button>
                </div>
                <hr className="border-[#203562] w-full mt-109 mb-6"/>
                {
                    current ?
                        <div className="flex flex-row gap-2">
                            <button
                                className="flex flex-row gap-5 p-4 items-center w-3/4 m-auto border-2 border-[#203562] rounded-lg cursor-pointer"
                                onClick={() => setCurrent(!current)}>
                                <UserIcon size={20} className={"bg-[#203562] text-white rounded-full p-2 size-10"}/>
                                <span className={"text-[#203562] text-2xl font-bold"}>{name}</span>
                            </button>
                        </div>
                        :
                        <div className="flex flex-row gap-2">
                            <div
                                className="flex flex-row gap-5 p-5 items-center w-3/4 m-auto border-2 border-red-600 rounded-lg cursor-pointer space-x-40">
                                <button className={"cursor-pointer"} onClick={() => setCurrent(!current)}>
                                    <XIcon size={32} className={"text-red-600 flex-1"}/>
                                </button>
                                <button className={"cursor-pointer"} onClick={() => logout()}>
                                    <PlugsIcon size={32} className={"text-red-600 flex-1"}/>
                                </button>
                            </div>
                        </div>
                }

            </div>
        </>
    );
}