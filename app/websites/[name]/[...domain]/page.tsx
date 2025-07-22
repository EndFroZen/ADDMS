"use client";

import { useEffect, useState } from "react";
import { BASE_URL, NToken } from "@/config/plublicpara";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export default function UserWeb({
    params,
}: {
    params: { name: string; domain: string[] };
}) {
    const { name, domain } = params;
    const fullPath = domain.join("/");

    const [data, setData] = useState<any>(null);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const router = useRouter()

    const fileExtensionsToEdit = [".js", ".ts", ".html", ".css", ".json"];
    const isEditableFile = fileExtensionsToEdit.some((ext) =>
        fullPath.endsWith(ext)
    );

    useEffect(() => {
        const fetchData = async () => {
            const token =
                typeof window !== "undefined" ? localStorage.getItem(NToken) : null;

            if (!token) {
                console.warn("No token found");
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`${BASE_URL}/api/file/${fullPath}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!res.ok) {
                    router.push("/dashboard");
                    throw new Error("Failed to fetch");
                }

                const result = await res.json();
                setData(result);
                console.log(result)
                setContent(result?.data?.content || "");
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [fullPath]);

    const handleSave = async () => {
        setSaving(true);
        const token = localStorage.getItem(NToken);
        try {
            const res = await fetch(`${BASE_URL}/api/file/${fullPath}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ content }),
            });
            if (!res.ok) throw new Error("Failed to save");

            // ✅ แก้ไขตรงนี้: เก็บข้อมูลไว้ใน state ไม่ต้องโหลดใหม่
            setData((prev: any) => ({
                ...prev,
                data: {
                    ...prev.data,
                    content: content,
                    modified: new Date().toISOString(),
                    size: new Blob([content]).size,
                },
            }));

            alert("✅ File saved successfully!");
            setIsEditable(false);
        } catch (err) {
            console.error("Save error:", err);
            alert("❌ Error saving file.");
        } finally {
            setSaving(false);
        }
    };


    return (
        <div className="min-h-screen bg-[#0f172a] text-white p-8">
            <div className="mx-auto bg-[#1e293b] rounded-2xl shadow-md p-6">
                <h1 className="text-2xl font-bold mb-4 text-orange-400 break-all">
                    {isEditableFile ? "Editing:" : "Files in:"} {fullPath}
                </h1>
                <p className="text-sm text-gray-400 mb-6">Owner : {name}</p>

                {loading ? (
                    <p className="text-gray-400">Loading data...</p>
                ) : isEditableFile ? (
                    <div className="space-y-4">
                        <div className="text-gray-400 text-sm">
                            Size: {(data?.data?.size / 1024).toFixed(1)} KB | Modified:{" "}
                            {new Date(data?.data?.modified).toLocaleString()}
                        </div>

                        {/* ปุ่มเปิด/ปิดแก้ไข */}
                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsEditable(!isEditable)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition ${isEditable
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-blue-600 hover:bg-blue-700"
                                    }`}
                            >
                                {isEditable ? "✅ Done" : "🔧 Edit"}
                            </button>
                        </div>

                        <div className="h-[500px] border rounded-md overflow-hidden">
                            <MonacoEditor
                                height="100%"
                                defaultLanguage="javascript"
                                value={content}
                                theme="vs-dark"
                                onChange={(val) => isEditable && setContent(val || "")}
                                options={{
                                    readOnly: !isEditable, // ห้ามแก้ไขถ้า isEditable = false
                                }}
                            />
                        </div>

                        {/* ปุ่ม Save จะขึ้นเฉพาะตอนแก้ไข */}
                        {isEditable && (
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="bg-green-600 px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition"
                            >
                                {saving ? "Saving..." : "💾 Save Changes"}
                            </button>
                        )}
                    </div>
                ) : data?.data?.length > 0 ? (
                    // ... (โค้ดแสดงรายการโฟลเดอร์/ไฟล์เดิม)
                    <ul className="divide-y divide-gray-700 border border-gray-700 rounded-lg overflow-hidden">
                        {[...data.data]
                            .sort((a, b) => {
                                if (a.type === "folder" && b.type !== "folder") return -1;
                                if (a.type !== "folder" && b.type === "folder") return 1;
                                return a.name.localeCompare(b.name);
                            })
                            .map((item: any, idx: number) => {
                                const newPath = [...domain, item.name].join("/");
                                return (
                                    <Link
                                        key={idx}
                                        href={`/websites/${name}/${newPath}`}
                                        className="block px-4 py-3 hover:bg-[#2c3a50] transition"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-5 h-5 text-gray-400">
                                                    {item.type === "folder" ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="w-5 h-5"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M2.25 12.75V6.75A2.25 2.25 0 014.5 4.5h3.757a2.25 2.25 0 011.59.659l1.157 1.157a2.25 2.25 0 001.59.659H19.5a2.25 2.25 0 012.25 2.25v1.5"
                                                            />
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M2.25 12.75V18a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25v-5.25"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="w-5 h-5"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M17.25 6.75V17.25C17.25 18.4926 16.2426 19.5 15 19.5H6.75C5.50736 19.5 4.5 18.4926 4.5 17.25V6.75C4.5 5.50736 5.50736 4.5 6.75 4.5H15C16.2426 4.5 17.25 5.50736 17.25 6.75Z"
                                                            />
                                                        </svg>
                                                    )}
                                                </div>
                                                <span className="text-sm text-gray-200">{item.name}</span>
                                            </div>
                                            <div className="text-xs text-gray-500 text-right">
                                                <div>{(item.size / 1024).toFixed(1)} KB</div>
                                                <div>{new Date(item.modified).toLocaleString()}</div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                    </ul>
                ) : (
                    <p className="text-gray-400">No files or folders found.</p>
                )}

                <div className="mt-6 flex justify-between">
                    <Link
                        href={
                            domain.length > 1
                                ? `/websites/${name}/${domain.slice(0, -1).join("/")}`
                                : "../../../dashboard"
                        }
                        className="bg-gradient-to-r from-orange-400 to-orange-500 px-4 py-2 rounded-md text-white font-medium hover:opacity-90 transition"
                    >
                        ← Go Back
                    </Link>

                    <Link
                        href="../../../dashboard"
                        className="bg-gradient-to-r from-orange-400 to-orange-500 px-4 py-2 rounded-md text-white font-medium hover:opacity-90 transition"
                    >
                        ← Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
