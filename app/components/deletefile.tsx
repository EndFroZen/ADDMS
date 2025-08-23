'use client';

import { BASE_URL, NToken } from "@/config/plublicpara";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteFileAndFolderProps {
    NameUser: string;
    Path: string;
}
export default function DeleteFileAndFolder({ Path, NameUser }: DeleteFileAndFolderProps) {
    const [loading, setLoading] = useState(false);
    const [successfullyCreated, setSuccessfullyCreated] = useState(false);
    const token = typeof window !== "undefined" ? localStorage.getItem(NToken) : null;
    const router = useRouter();
    const deleteFile = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${BASE_URL}/api/delete/singlefile`, {
                method: "POST",
                body: JSON.stringify({
                    "path": `${Path}`
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const result = await res.json();
            // if (result['status'] === 500) {
            //     console.error("Server error:", result['message']);
            //     return;
            // }
            if (!res.ok) {
                throw new Error("Failed to fetch");
                alert("❌ Error creating new file.");
            } else {
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
        const parentPath = Path.split("/").slice(0, -1).join("/");
                router.push(`/websites/${NameUser}/${parentPath}`);
    };
    if (successfullyCreated) {
        return (
            <div className="w-full mx-auto mt-8 p-5 bg-[#1e293b] rounded-lg shadow-lg border border-gray-700">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-lg font-semibold text-green-500 mb-4">Delete successful!</h2>
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

        <div>
            <h2>Delete {Path}</h2>
            <p>Are you sure you want to delete {Path}?</p>
            <button onClick={() => deleteFile()} className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition">Confirm</button>
        </div>
    );
}