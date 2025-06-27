'use client';
import { useRouter } from "next/navigation";
import { NToken } from "@/config/plublicpara";
// import TopNavigation from "../components/topnavbar/page";
export default function Setting(){
    const page = "setting"
    const route = useRouter()
    async function logout() {
        localStorage.removeItem(NToken)
        route.push('/')
    }
    return( <div>
        {/* <TopNavigation page={page}/> */}
        <button onClick={logout}>logout</button>
    </div>)
}