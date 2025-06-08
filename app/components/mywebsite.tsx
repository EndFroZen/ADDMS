'use client'

import { BASE_URL, NToken } from "@/config/plublicpara";
import { useEffect, useState } from "react";

interface Domain {
    ID: number;
    Domain_name: string;
    Is_verified: string;
    Ssl_enabled: string;
}

interface Website {
    id: number;
    created_at: string;
    status: string;
    storage_limit: number;
    domain: Domain;
    framwork: string;
    programinglangue: string;
}

interface AllWebsiteModels {
    status: number;
    website: Website[];
}
interface MywebsiteProps {
  setActivePage: (page: string) => void;
}


export default function Mywebsite({setActivePage}:MywebsiteProps) {
    const yourToken = typeof window !== 'undefined' ? localStorage.getItem(NToken) : null;
    const [allwebsite, setWebsite] = useState<AllWebsiteModels | null>(null)
    async function loadUser() {
        try {
            const res = await fetch(`${BASE_URL}/api/allwebsite`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${yourToken}`,
                },
            });

            const result = await res.json();
            if (res.status === 200) {
                setWebsite(result);
                console.log(result)
            }
        } catch (err) {
            console.log("Failed to fetch user:", err);
        }
    }

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <div className="bg-red-800 px-2">
            {allwebsite ? (
                allwebsite.website.length === 0 ? (
                    <div className="">no</div>

                ) : (
                    allwebsite.website.map((site) => (
                        <div className="bg-white rounded-md mt-4 p-4 shadow hover:cursor-pointer" onClick={()=>{setActivePage(`${site.domain.Domain_name}`)}}>
                            <div className="flex justify-between items-center mb-2">
                                <div className="text-lg font-semibold text-gray-800">{site.domain.Domain_name}</div>
                                <div className={`text-sm font-medium px-2 py-1 rounded ${site.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                    {site.status}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                                <div>
                                    <label className="block text-gray-500">Programming Language</label>
                                    <div>{site.programinglangue}</div>
                                </div>
                                <div>
                                    <label className="block text-gray-500">Framework</label>
                                    <div>{site.framwork}</div>
                                </div>
                            </div>
                        </div>

                    ))
                )
            ) : (
                <div className="">Loading</div>
            )}
        </div>
    )
}