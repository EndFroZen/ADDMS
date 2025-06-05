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

interface UserModel {
    email: string;
    folder: string;
    name: string;
    storage: number;
    website: Website[];
}


export default function Mywebsite() {
    const yourToken = typeof window !== 'undefined' ? localStorage.getItem(NToken) : null;
    const [user, setUser] = useState<UserModel | null>(null)
    async function loadUser() {
        try {
            const res = await fetch(`${BASE_URL}/api/dashboard`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${yourToken}`,
                },
            });

            const result = await res.json();
            if (res.status === 200) {
                setUser(result);
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
        <div className="bg-slate-800">
            {user ? (
                user.website.length === 0 ? (
                    <div className="">NO web</div>
                ) : (
                    user.website.map((site) => (
                        <div className="mb-1 bg-white">
                            <div className="">
                                <div className="text-xl">{site.domain.Domain_name}</div>
                                <div className="flex gap-1">
                                    
                                </div>
                                <div className="">{site.programinglangue}</div>
                                    <div className="">{site.framwork}</div>
                                </div>
                        </div>
                    ))
                )
            ) : (
                <div className="">No user</div>
            )}
        </div>
    )
}