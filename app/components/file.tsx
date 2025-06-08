'use client'

import { BASE_URL, NToken } from "@/config/plublicpara"
import { useEffect, useState } from "react"

interface FileOrFolder {
    name: string
    path: string
    type: "file" | "folder"
    size: number
    modified: string
}

interface ApiResponse {
    data: FileOrFolder[]
    message: string
    path: string
    status: number
}

export default function Openfile({ path }: { path: string }) {
    const yourToken = typeof window !== 'undefined' ? localStorage.getItem(NToken) : null;
    const [fileData, setFile] = useState<ApiResponse | null>(null)
    console.log(`${BASE_URL}/api/file/${path}`)
    async function loadData(path: string) {
        try {
            const res = await fetch(`${BASE_URL}/api/file/${path}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${yourToken}`,
                },
            })
            const result = await res.json()
            if (result["status"] === 200) {
                setFile(result)
                console.log(result)
            } else {
                console.log("no data")

            }
        } catch (err) {
            console.log(err)
        }

    }
    useEffect(() => {
        loadData(path)
    }, [path])
    return (
        <div className="p-4">
            <h2 className="font-bold mb-2">📂 ไฟล์ในโฟลเดอร์: {path}</h2>
            {fileData ? (
                fileData.data && fileData.data.length > 0 ? (
                    fileData.data.map((site) => (
                        <div
                            key={site.path}
                            className="cursor-pointer hover:bg-orange-100 p-2 rounded"
                            onClick={() => {
                                loadData(site.path)
                            }}
                        >
                            <span>{site.type === "folder" ? "📁" : "📄"} </span>
                            {site.name}
                        </div>
                    ))
                ) : (
                    <div>ไม่มีไฟล์หรือโฟลเดอร์ใน path นี้</div>
                )
            ) : (
                <div>กำลังโหลด...</div>
            )}
        </div>
    );


}