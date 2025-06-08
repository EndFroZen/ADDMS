'use client'

import { BASE_URL, NToken } from "@/config/plublicpara";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface UserInfo {
  email: string;
  folder: string;
  memory: number;
  role: string;
  status: number;
  username: string;
}
interface ApiResponse {
  status: number;
  website: Website[];
}

interface Website {
  id: number;
  created_at: string; // ISO date string
  framwork: string;
  programinglangue: string;
  status: string;
  storage_limit: number;
  domain: Domain;
}

interface Domain {
  ID: number;
  CreatedAt: string; // ISO date string
  UpdatedAt: string; // ISO date string
  DeletedAt: string | null;
  Domain_name: string;
  Is_verified: string;  // "false" or "true" as string
  Ssl_enabled: string;  // "false" or "true" as string
}

export default function Dashboard() {
  const yourToken = typeof window !== 'undefined' ? localStorage.getItem(NToken) : null;
  const route = useRouter()
  
  const [user ,setUser] = useState<UserInfo | null>(null)
  const [allWebsite ,setAllWebsite] = useState<ApiResponse | null>(null)
  async function loadUser() {
    try {
      const res = await fetch(`${BASE_URL}/api/datauser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${yourToken}`,
        },
      })
      const result = await res.json()
      if (result["status"] === 200) {
        setUser(result)
      }
    } catch (err) {
      console.log(err)
    }
  }
  async function loadAllWebsite() {
    try {
      const res = await fetch(`${BASE_URL}/api/allwebsite`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${yourToken}`,
        },
      })
      const result = await res.json()
      if (result["status"] === 200) {
        setAllWebsite(result)
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => { 
    loadUser(),
    loadAllWebsite()
   }, [])
  return(
    <div className="">
      {allWebsite ?(
        allWebsite.website.length === 0 ?(
          <div className="">no web</div>
        ):(
          allWebsite.website.map((site)=>(
            <div className="hover:bg-yellow-100" onClick={()=>route.push(`/${user?.username}/${site.domain.Domain_name}`)}>{site.domain.Domain_name}</div>
          ))
        )
      ):(
        <div className=""> LOAD </div>
      )}
    </div>
  )
}
// 'use client';
// import { useState, useEffect } from "react";
// import Mywebsite from "../components/mywebsite";
// import Navbar from "../components/navbar";
// import Overview from "../components/overview";
// export default function Dashboard() {
//   const [activePage,setActivePage] = useState("")
//   console.log(activePage)
//   return (
//     <div className="h-screen flex">
//       <div className="bg-gray-100" style={{ width: '3%' }}>
//         <Navbar/>
//       </div>
//       <div className="bg-gray-200" style={{ width: '20%' }}>
//         <Mywebsite setActivePage={setActivePage}/>
//       </div>
//       <div className="bg-white flex-1 overflow-auto">
//         <Overview web={activePage}/>
//       </div>
//     </div>



//   )
// }
