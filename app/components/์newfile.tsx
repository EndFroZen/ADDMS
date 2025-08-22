"use client";
import { BASE_URL, NToken } from "@/config/plublicpara";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "./loading";

// รับ props เป็น object
interface NewFileCompoProps {
    NameUser: string;
    Path: string;
}

export default function NewFileCompo({ Path ,NameUser }: NewFileCompoProps) {
    console.log(NameUser)
    const [loading, setLoading] = useState(false);
    const [successfullyCreated, setSuccessfullyCreated] = useState(false);
    const token = typeof window !== "undefined" ? localStorage.getItem(NToken) : null;
    const router = useRouter();
    const NewFile = async () => {
        const newFile = (document.getElementById("NewFileText") as HTMLInputElement).value
        try {
            setLoading(true);
            const res = await fetch(`${BASE_URL}/api/add/singlefile`, {
                method: "POST",
                body: JSON.stringify({
                    "path": `${Path}/${newFile}`
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const  result = await res.json();
            // if (result['status'] === 500) {
            //     console.error("Server error:", result['message']);
            //     return;
            // }
            if (!res.ok) {
                throw new Error("Failed to fetch");
                alert("❌ Error creating new file.");
            }else{
                setSuccessfullyCreated(true);
            }
            console.log(result)
            
        } catch (err) {
            setLoading(false);
        } finally {
            setLoading(false);
        }

    }
    const isSuccess = () =>{
        window.location.reload()
    };
    if (successfullyCreated) {
        return (
            <div className="w-full mx-auto mt-8 p-5 bg-[#1e293b] rounded-lg shadow-lg border border-gray-700">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-lg font-semibold text-green-500 mb-4">File created successfully!</h2>
                    <button
                        onClick={isSuccess}
                        className="px-6 py-2 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-lg shadow hover:from-green-500 hover:to-green-600 transition-all duration-150 font-semibold text-base"
                    >
                        Go to File
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className="w-full mx-auto mt-8 p-5 bg-[#1e293b] rounded-lg shadow-lg border border-gray-700">
            <div className="flex flex-row items-center gap-3">
                <span className="text-lg font-bold text-orange-400 truncate max-w-[800px]" title={Path}>{Path}/</span>
                <input
                id="NewFileText"
                    type="text"
                    placeholder="New file or New folder"
                    className="flex-1 h-11 px-4 text-base rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400 text-white bg-[#0f172a] shadow-sm transition-all duration-150 placeholder-gray-400"
                />
                <button
                    
                    type="submit"
                    className="h-11 px-6 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg  shadow hover:from-orange-500 hover:to-orange-600 transition-all duration-150 font-semibold text-base flex items-center justify-center"
                    onClick={() => NewFile()}
                >
                    Create
                </button >
            </div>
            {loading && <Loading text="Creating new file..." />}
            
        </div>
    );
}
