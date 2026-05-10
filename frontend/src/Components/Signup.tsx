import {useNavigate} from "react-router";
import {ArrowCircleLeftIcon} from "@phosphor-icons/react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import api from "../api/axios";
import {useState} from "react";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSignUp = async () => {
        try{
            await api.post("/signup", {name: name, email: email, password: password});
            navigate('/signin');
        }catch (err) {
            console.log(err);
        }
    }
    const navigate = useNavigate();
    return(
        <div className="h-screen w-screen bg-[#E0E4F1]">
            <div className="flex flex-col gap-5 items-center justify-center h-full">
                <div className="flex flex-col gap-5 bg-white w-max h-max px-30 py-20 rounded-md items-center justify-center">
                    <button className={"flex flex-row gap-3 -ml-80 cursor-pointer"} onClick={()=>navigate("/")}><div><ArrowCircleLeftIcon size={26} /></div><div>Back</div></button>
                    <span className={"text-[#203562] font-bold text-2xl mb-15"}>Sign Up</span>
                    <input onChange={(e)=>setName(e.target.value)} type="text" placeholder="Name" className={"outline-none bg-gray-200 p-2 rounded-md"}/>
                    <input onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="Email" className={"outline-none bg-gray-200 p-2 rounded-md"}/>
                    <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" className={"outline-none bg-gray-200 p-2 rounded-md mb-5"}/>
                    <button onClick={()=>handleSignUp()} className={"text-white bg-[#203562] w-full p-2 rounded-md cursor-pointer"}>Sign Up</button>
                    <span>Already have an account? <button className={"text-[#203562] font-bold"} onClick={()=>navigate("/signin")}>Sign In</button></span>
                </div>
            </div>
        </div>
    );
}