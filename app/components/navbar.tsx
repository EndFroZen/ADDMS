'use client'

import { useRouter } from "next/router"

export default function Navbar(){
    const route = useRouter
    return(
        <div className="">
            <div className="hover:bg-orange-800">logo</div>
            <div className="hover:bg-orange-800">user</div>
            <div className="hover:bg-orange-800">New Deply</div>
            <div className="hover:bg-orange-800">Setting</div>
        </div>
    )
}