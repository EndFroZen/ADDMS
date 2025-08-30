"use client";
import { BASE_URL, NToken } from "@/config/plublicpara";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "./loading";

interface NewFileCompoProps {
    NameUser: string;
    Path: string;
}

export default function NewFileCompo({ Path, NameUser }: NewFileCompoProps) {
    const [loading, setLoading] = useState(false);
    const [successfullyCreated, setSuccessfullyCreated] = useState(false);
    const [type, setType] = useState<"file" | "folder">("file");
    const [errorMessage, setErrorMessage] = useState(""); // <-- เพิ่ม
    const token = typeof window !== "undefined" ? localStorage.getItem(NToken) : null;
    const router = useRouter();

    const NewFile = async () => {
        const newName = (document.getElementById("NewFileText") as HTMLInputElement).value;
        if (!newName) {
            setErrorMessage("⚠️ Please enter a name");
            return;
        }

        const apiUrl = `${BASE_URL}/api/add/${type === "file" ? "singlefile" : "singlefolder"}`;

        try {
            setLoading(true);
            setErrorMessage(""); // ล้าง error ก่อนเริ่มใหม่

            const res = await fetch(apiUrl, {
                method: "POST",
                body: JSON.stringify({
                    "path": `${Path}/${newName}`
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const result = await res.json();

            if (!res.ok) {
                console.error(result);
                setErrorMessage(`❌ Error creating new ${type}.`);
            } else {
                setSuccessfullyCreated(true);
            }
        } catch (err) {
            console.error(err);
            setErrorMessage(`❌ Failed to create new ${type}.`);
        } finally {
            setLoading(false);
        }
    };

    const goToFile = () => {
        window.location.reload();
    };

    if (successfullyCreated) {
        return (
            <div className="w-full mx-auto mt-8 p-5 bg-[#1e293b] rounded-lg shadow-lg border border-gray-700">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-lg font-semibold text-green-500 mb-4">{type} created successfully!</h2>
                    <button
                        onClick={goToFile}
                        className="px-6 py-2 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-lg shadow hover:from-green-500 hover:to-green-600 transition-all duration-150 font-semibold text-base"
                    >
                        Go to {type}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full mx-auto mt-8 p-5 bg-white rounded-lg shadow-lg border border-gray-700">
            {errorMessage && (
                <div className="mb-4 p-3 bg-red-600 text-white rounded-md text-center">
                    {errorMessage}
                </div>
            )}
            <div className="flex flex-row items-center gap-3">
                <span className="text-lg font-bold text-orange-400 truncate max-w-[800px]" title={Path}>{Path}/</span>
                <input
                    id="NewFileText"
                    type="text"
                    placeholder={`New ${type}`}
                    className="flex-1 h-11 px-4 text-base rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400 text-black bg-white shadow-sm transition-all duration-150 placeholder-gray-400"
                />
                <select
                    className="h-11 px-3 bg-white text-black border border-gray-600 rounded-lg"
                    value={type}
                    onChange={(e) => setType(e.target.value as "file" | "folder")}
                >
                    <option value="file">File</option>
                    <option value="folder">Folder</option>
                </select>
                <button
                    type="submit"
                    className="h-11 px-6 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg shadow hover:from-orange-500 hover:to-orange-600 transition-all duration-150 font-semibold text-base flex items-center justify-center"
                    onClick={NewFile}
                >
                    Create
                </button>
            </div>
            {loading && 
            <div className="w-full h-full absolute inset-0 flex items-center justify-center animated-gradient rounded-md"><Loading text={`Creating new ${type}...`} /></div>
}
        </div>
    );
}
