import {useState} from "react";
import SearchItemList from "./SearchItemList.tsx";

interface SearchProps {
    user_id?: number | undefined
}

export default function Search({user_id}: SearchProps) {
    const [active, setActive] = useState<string | null>(null);
    const [current, setCurrent] = useState("");
    const [search, setSearch] = useState("");
    function handleSearch(e: string) {
        setActive(active === e ? null : e);
        if(e==="By titre") {
            setCurrent("searchbytitle");
        }
        else if(e==="By date") {
            setCurrent("searchbydate");
        }
        else if(e==="By priority") {
            setCurrent("searchbypriority");
        }
    }

    return (
        <div className={"bg-[#E0E4F1] min-h-screen w-full flex flex-col items-center justify-start pt-30"}>
            <div className={"flex flex-row items-center w-90% p-5"}>
                <div className={"bg-[#203562] w-1 h-14 mr-4"}></div>
                <div className={"bg-gray-500 w-1 h-12 mr-2"}></div>
                <input onChange={(e)=>setSearch(e.target.value)} className={"text-black text-4xl outline-none w-auto"} type="text"
                       placeholder={"Type to search"}/>
            </div>
            <div className={"flex flex-row items-center w-90%"}>
                {["By titre", "By date", "By priority"].map((label) => (
                    <button
                        key={label}
                        onClick={() => {handleSearch(label)}}
                        className={`border-2 border-gray-700 rounded-2xl pb-1.5 px-2 pt-0.5 m-1 cursor-pointer ${active === label ? "bg-gray-700 text-white" : ""}`}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <div className={"flex flex-col items-center justify-center w-[90%] mt-10 bg-white rounded-md h-max"}>
                <SearchItemList user_id={user_id} current={current} search={search}/>
            </div>
        </div>
    );
}