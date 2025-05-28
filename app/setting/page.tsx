'use client';
import { useRouter } from "next/navigation";
import { NToken } from "@/config/plublicpara";
export default function Setting(){
    const route = useRouter()
    async function logout() {
        localStorage.removeItem(NToken)
        route.push('/')
    }
    return( <div>
        <button onClick={logout}>logout</button>
    </div>)
}