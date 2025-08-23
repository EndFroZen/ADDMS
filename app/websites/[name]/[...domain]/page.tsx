"use client";

import { useEffect, useState } from "react";
import { BASE_URL, NToken } from "@/config/plublicpara";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/loading";
import NewFileCompo from "@/app/components/์newfile";
import DeleteFileAndFolder from "@/app/components/deletefile";
import CommandSetting from "@/app/components/commandsetting";

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
    const router = useRouter();
    const [showNewFile, setShowNewFile] = useState(false);
    const [showDeleteFile, setShowDeleteFile] = useState(false);
    const [isMainFile, setIsMainFile] = useState(false);

    const fileExtensionsToEdit = [
        ".js", ".jsx", ".ts", ".tsx", ".html", ".htm", ".css", ".scss", ".less", ".json", ".jsonc",
        ".yml", ".yaml", ".xml", ".svg", ".vue", ".svelte", ".astro", ".liquid",
        ".py", ".java", ".c", ".cpp", ".h", ".hpp", ".cs", ".go", ".php", ".rb", ".swift", ".rs",
        ".dart", ".kt", ".kts", ".sh", ".ps1", ".sql", ".r", ".jl", ".erl", ".pl", ".f", ".for",
        ".cob", ".asm", ".pas", ".lisp", ".clj", ".ex", ".hrl", ".fs", ".fsi", ".fsscript", ".d",
        ".groovy", ".hs", ".lhs", ".m", ".nim", ".rkt", ".scala", ".tcl", ".vb",
        ".md", ".markdown", ".txt", ".rtf", ".csv", ".tsv", ".log", ".wiki", ".rst", ".adoc", ".nfo",
        ".env", ".gitignore", ".gitattributes", ".editorconfig", ".npmrc", ".yarnrc", ".bowerrc",
        ".dockerfile", ".make", ".mk", ".pom", ".gradle", ".props", ".targets", ".sln", ".csproj",
        ".vite", ".webpack", ".babelrc", ".eslintrc", ".prettierrc", ".browserslistrc",
        ".tex", ".sty", ".cls", ".bib",
        ".lock", ".example", ".test", ".spec", ".map", ".cert", ".pem", ".key", ".crt"
    ];

    const isEditableFile = fileExtensionsToEdit.some((ext) => fullPath.toLowerCase().endsWith(ext));
    const token = typeof window !== "undefined" ? localStorage.getItem(NToken) : null;
    useEffect(() => {
        const fetchData = async () => {
            const token = typeof window !== "undefined" ? localStorage.getItem(NToken) : null;
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
        CheckIsMainFile();
        fetchData();
    }, [fullPath, router]);
    const CheckIsMainFile = () => {
        if (domain.length === 1) {
            setIsMainFile(true);
        }
    }
    const handleSave = async () => {
        setSaving(true);
        const newPath = (document.getElementById("newPath") as HTMLInputElement).value;
        const token = localStorage.getItem(NToken);
        const Newdomain = domain.slice(0, -1).concat(newPath);
        const NewFullPath = Newdomain.join("/");
        console.log("NewFullPath:", newPath);
        try {
            setLoading(true);
            const res = await fetch(`${BASE_URL}/api/edit/singlefile`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    "path": fullPath,
                    "newpath": `${NewFullPath}`,
                    "content": content,
                }),
            });


            if (res.ok) {
                const result = await res.json();
            }

        } catch (err) {
            console.error("Save error:", err);
        } finally {
            router.push(`/websites/${name}/${NewFullPath}`);
            setSaving(false);
            setLoading(false);
            setIsEditable(false);
        }
    };

    const getLanguageFromExtension = () => {
        const ext = fullPath.slice(fullPath.lastIndexOf(".") + 1).toLowerCase();
        const languageMap: { [key: string]: string } = {
            js: "javascript",
            jsx: "javascript",
            ts: "typescript",
            tsx: "typescript",
            html: "html",
            htm: "html",
            css: "css",
            scss: "scss",
            less: "less",
            json: "json",
            jsonc: "json",
            yml: "yaml",
            yaml: "yaml",
            xml: "xml",
            svg: "xml",
            vue: "vue",
            svelte: "svelte",
            astro: "astro",
            liquid: "liquid",
            py: "python",
            java: "java",
            c: "c",
            cpp: "cpp",
            h: "cpp",
            hpp: "cpp",
            cs: "csharp",
            go: "go",
            php: "php",
            rb: "ruby",
            swift: "swift",
            rs: "rust",
            dart: "dart",
            kt: "kotlin",
            kts: "kotlin",
            sh: "shell",
            ps1: "powershell",
            sql: "sql",
            r: "r",
            jl: "julia",
            erl: "erlang",
            pl: "perl",
            f: "fortran",
            for: "fortran",
            cob: "cobol",
            asm: "assembly",
            pas: "pascal",
            lisp: "lisp",
            clj: "clojure",
            ex: "elixir",
            hrl: "erlang",
            fs: "fsharp",
            fsi: "fsharp",
            fsscript: "fsharp",
            d: "d",
            groovy: "groovy",
            hs: "haskell",
            lhs: "haskell",
            m: "matlab",
            nim: "nim",
            rkt: "racket",
            scala: "scala",
            tcl: "tcl",
            vb: "vb",
            md: "markdown",
            markdown: "markdown",
            txt: "plaintext",
            rtf: "plaintext",
            csv: "csv",
            tsv: "tsv",
            log: "log",
            wiki: "plaintext",
            rst: "restructuredtext",
            adoc: "asciidoc",
            nfo: "plaintext",
            env: "plaintext",
            gitignore: "gitignore",
            gitattributes: "plaintext",
            editorconfig: "ini",
            npmrc: "ini",
            yarnrc: "yaml",
            bowerrc: "json",
            dockerfile: "dockerfile",
            make: "makefile",
            mk: "makefile",
            pom: "xml",
            gradle: "groovy",
            props: "properties",
            targets: "xml",
            sln: "solution",
            csproj: "xml",
            vite: "javascript",
            webpack: "javascript",
            babelrc: "json",
            eslintrc: "json",
            prettierrc: "json",
            browserslistrc: "plaintext",
            tex: "latex",
            sty: "latex",
            cls: "latex",
            bib: "bibtex",
            lock: "yaml",
            example: "plaintext",
            test: "plaintext",
            spec: "plaintext",
            map: "json",
            cert: "plaintext",
            pem: "plaintext",
            key: "plaintext",
            crt: "plaintext",
        };
        return languageMap[ext] || "plaintext";
    };

    const renderBreadcrumbs = () => {
        const pathParts = [name, ...domain];
        return (

            <nav className="flex items-center text-sm text-gray-400 mb-4">
                {pathParts.map((part, idx) => {
                    const href = `/websites/${name}/${pathParts.slice(1, idx + 1).join("/")}`;
                    return (
                        <span key={idx} className="flex items-center">
                            {idx > 0 && <span className="mx-2">/</span>}
                            {idx === pathParts.length - 1 ? (
                                <span className="text-black">{part}</span>
                            ) : (
                                <Link href={href} className="text-orange-400 hover:underline">
                                    {part}
                                </Link>
                            )}
                        </span>
                    );
                })}
            </nav>
        );
    };

    return (
        <>

            <div className="min-h-screen bg-gray-50 text-black font-sans">
                <div className="max-w-[100%] mx-auto py-12 px-12">
                    {/* GitHub-like header */}
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            {renderBreadcrumbs()}
                            <h1 className="text-xl font-semibold text-orange-400">
                                {isEditableFile ? fullPath.split("/").pop() : fullPath}
                            </h1>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Link
                                href="/dashboard"
                                className="px-3 py-1.5 text-sm bg-gray-100 text-black rounded-md hover:bg-[#3b4a66] transition"
                            >
                                Back to Dashboard
                            </Link>
                        </div>
                    </div>

                    {loading ? (
                        <Loading text="Loading file..." />
                    ) : isEditableFile ? (
                        <div className="bg-white border border-gray-200 border border-gray-700 rounded-lg shadow-md">
                            {/* File action toolbar */}
                            <div className="flex items-center justify-between p-3 border-b border-gray-700">
                                <div className="flex items-center space-x-2 text-sm">
                                    <span className="text-gray-400">
                                        Size: {(data?.data?.size / 1024).toFixed(1)} KB
                                    </span>
                                    <span className="text-gray-500">•</span>
                                    <span className="text-gray-400">
                                        Modified: {new Date(data?.data?.modified).toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {isEditable ? (
                                        <>
                                            <span className="text-gray-400">Rename to:</span>
                                            <input type="text" id="newPath" defaultValue={domain[domain.length - 1]} className="text-black px-3 rounded-lg h-8" />
                                            <button
                                                onClick={handleSave}
                                                disabled={saving}
                                                className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition"
                                            >
                                                {saving ? "Saving..." : "Save changes"}
                                            </button>
                                            <button
                                                onClick={() => setIsEditable(false)}
                                                className="px-3 py-1.5 text-sm bg-gray-100 text-black rounded-md hover:bg-[#3b4a66] transition"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <div className="flex flex-row gap-2">
                                            <button
                                                onClick={() => setIsEditable(true)}
                                                className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                            >
                                                Edit file
                                            </button>
                                            <button onClick={() => setShowDeleteFile(true)} className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center space-x-1">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-4 h-4"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M9 3a1 1 0 0 0-1 1v1H4v2h1v12a2 2 0 0 0 2 2h10a2 
        2 0 0 0 2-2V7h1V5h-4V4a1 1 0 0 
        0-1-1H9zm2 5h2v9h-2V8zm-4 0h2v9H7V8zm8 
        0h2v9h-2V8z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <span>Delete file</span>

                                            </button>
                                            {showDeleteFile && (
                                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                                    <div className="bg-[#0f172a] text-black p-6 rounded-lg shadow-lg  max-w-full relative">
                                                        {/* Header */}
                                                        <div className="flex items-center justify-between mb-4">
                                                            <h2 className="text-lg font-semibold">Create New</h2>
                                                            <button
                                                                className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                                                onClick={() => setShowDeleteFile(false)}
                                                            >
                                                                ✕
                                                            </button>
                                                        </div>
                                                        <div>
                                                            <DeleteFileAndFolder Path={fullPath} NameUser={name} />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>


                                    )}
                                </div>
                            </div>
                            {/* Monaco Editor */}
                            <div className="h-[600px]">
                                <MonacoEditor
                                    height="100%"
                                    language={getLanguageFromExtension()}
                                    value={content}
                                    theme="vs-light"
                                    onChange={(val) => isEditable && setContent(val || "")}
                                    options={{
                                        readOnly: !isEditable,
                                        minimap: { enabled: false },
                                        fontSize: 14,
                                        lineNumbers: "on",
                                        scrollBeyondLastLine: false,
                                        automaticLayout: true,
                                    }}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-row justify-center">
                            
                            <div className="bg-white border border-gray-200 border border-gray-700 rounded-lg shadow-md min-w-[100%]">
                                {/* File list header */}
                                
                                <div className="flex items-center justify-between p-3 border-b border-gray-700">
                                    <div className="text-sm font-medium text-black">Files</div>
                                    <div className="flex items-center space-x-2">
                                        <button className="px-3 py-1.5 text-sm bg-gray-100 text-black rounded-md hover:bg-[#3b4a66] transition" onClick={() => setShowNewFile(true)}>
                                            New file
                                        </button>
                                        {showNewFile && (
                                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                                <div className="bg-[#0f172a] text-black p-6 rounded-lg shadow-lg  max-w-full relative">
                                                    {/* Header */}
                                                    <div className="flex items-center justify-between mb-4">
                                                        <h2 className="text-lg font-semibold">Create New</h2>
                                                        <button
                                                            className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                                            onClick={() => setShowNewFile(false)}
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                    <div>
                                                        <NewFileCompo Path={fullPath} NameUser={name} />
                                                    </div>
                                                </div>
                                            </div>
                                        )}


                                        <button className="px-3 py-1.5 text-sm bg-gray-100 text-black rounded-md hover:bg-[#3b4a66] transition">
                                            Upload files
                                        </button>

                                        {!isMainFile && (
                                            <button onClick={() => setShowDeleteFile(true)} className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center space-x-1">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-4 h-4"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M9 3a1 1 0 0 0-1 1v1H4v2h1v12a2 2 0 0 0 2 2h10a2 
        2 0 0 0 2-2V7h1V5h-4V4a1 1 0 0 
        0-1-1H9zm2 5h2v9h-2V8zm-4 0h2v9H7V8zm8 
        0h2v9h-2V8z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <span>Delete Directory</span>

                                            </button>
                                        )}
                                        {showDeleteFile && (
                                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                                <div className="bg-[#0f172a] text-black p-6 rounded-lg shadow-lg  max-w-full relative">
                                                    {/* Header */}
                                                    <div className="flex items-center justify-between mb-4">
                                                        <h2 className="text-lg font-semibold">Create New</h2>
                                                        <button
                                                            className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                                            onClick={() => setShowDeleteFile(false)}
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                    <div>
                                                        <DeleteFileAndFolder Path={fullPath} NameUser={name} />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                </div>
                                {/* File list */}
                                {data?.data?.length > 0 ? (
                                    <>
                                        <div className="divide-y divide-gray-700">
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
                                                            className="flex items-center justify-between p-3 hover:bg-[#2c3a50] transition"
                                                        >
                                                            <div className="flex items-center space-x-3">
                                                                {item.type === "folder" ? (
                                                                    <svg
                                                                        className="w-5 h-5 text-orange-400"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth="1.5"
                                                                            d="M2.25 12.75V6.75A2.25 2.25 0 014.5 4.5h3.757a2.25 2.25 0 011.59.659l1.157 1.157a2.25 2.25 0 001.59.659H19.5a2.25 2.25 0 012.25 2.25v1.5"
                                                                        />
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth="1.5"
                                                                            d="M2.25 12.75V18a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25v-5.25"
                                                                        />
                                                                    </svg>
                                                                ) : (
                                                                    <svg
                                                                        className="w-5 h-5 text-gray-400"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth="1.5"
                                                                            d="M17.25 6.75V17.25C17.25 18.4926 16.2426 19.5 15 19.5H6.75C5.50736 19.5 4.5 18.4926 4.5 17.25V6.75C4.5 5.50736 5.50736 4.5 6.75 4.5H15C16.2426 4.5 17.25 5.50736 17.25 6.75Z"
                                                                        />
                                                                    </svg>
                                                                )}
                                                                <span className="text-sm text-black">{item.name}</span>
                                                            </div>
                                                            <div className="flex flex-row gap-3">
                                                                <div className="text-xs text-gray-500 text-right">
                                                                    <div>{(item.size / 1024).toFixed(1)} KB</div>
                                                                    <div>{new Date(item.modified).toLocaleString()}</div>
                                                                </div>
                                                            </div>
                                                        </Link>

                                                    );
                                                })}

                                        </div>

                                    </>
                                ) : (
                                    <div className="p-3 text-gray-400">No files or folders found.</div>
                                )}

                            </div>
                            
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}