import {useNavigate} from "react-router";
import {ArrowCircleLeftIcon} from "@phosphor-icons/react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import api from "../api/axios";
import {useState} from "react";
export default function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toast, setToast] = useState<{ text: string; type: "success" | "error" } | null>(null);

    const showToast = (text: string, type: "success" | "error") => {
        setToast({ text, type });
        setTimeout(() => setToast(null), 3000);
    };
    const handleSignIN = async () => {
        try{
            const resp = await api.post("/signin", {email: email, password: password});
            localStorage.setItem("token", resp.data.access_token);
            localStorage.setItem("user_id", resp.data.user_id);
            localStorage.setItem("user_name", resp.data.user_name);
            console.log(resp.data.access_token);
            navigate(`/Notes/${resp.data.user_id}`);
        }catch (err) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            showToast(err.response.data.message, "error");
        }
    }
    const navigate = useNavigate();
    return(
        <div className="h-screen w-screen bg-[#E0E4F1]">
            {toast && (
                <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-md shadow-lg text-white font-medium
        ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
                    {toast.text}
                </div>
            )}
            <div className="flex flex-col gap-5 items-center justify-center h-full">
                <div className="flex flex-col gap-5 bg-white w-max h-max px-31 py-20 rounded-md items-center justify-center">
                    <button className={"flex flex-row gap-3 -ml-80 cursor-pointer"} onClick={()=>navigate("/")}><div><ArrowCircleLeftIcon size={26} /></div><div>Back</div></button>
                    <span className={"text-[#203562] font-bold text-2xl mb-15"}>Sign In</span>
                    <input onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="Email" className={"outline-none bg-gray-200 p-2 rounded-md"}/>
                    <input onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password" className={"outline-none bg-gray-200 p-2 rounded-md mb-20"}/>
                    <button onClick={()=>{handleSignIN()}} className={"text-white bg-[#203562] w-full p-2 rounded-md cursor-pointer"}>Sign In</button>
                    <span>Don't have an account? <button className={"text-[#203562] font-bold"}  onClick={()=>navigate("/signup")}>Sign Up</button></span>
                </div>
            </div>
        </div>
    );
}