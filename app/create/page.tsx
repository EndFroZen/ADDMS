'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BASE_URL, NToken } from '@/config/plublicpara';
import { ShieldCheck, Settings } from 'lucide-react';
import Loading from '../components/loading';

export default function Create() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [lang, setLang] = useState('nodejs');
    const yourToken = typeof window !== 'undefined' ? localStorage.getItem(NToken) : null;

    function reFramework(e: React.ChangeEvent<HTMLSelectElement>) {
        setLang(e.target.value);
    }

    const frameworkOptions: { [key: string]: string[] } = {
        nodejs: ['Express', 'Fastify', 'NextJS', 'Koa'],
        go: ['Gin', 'Fiber', 'Echo', 'Chi'],
        php: ['Laravel', 'Symfony', 'CodeIgniter', 'Slim'],
    };

    async function reloadNginx() {
        const res = await fetch(`${BASE_URL}/api/reloadnginx`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${yourToken}`,
            },
        });
        if(!res.ok){
            alert("Deploy failed: ");
        }
    }
    async function deploy() {
        const Domain = (document.getElementsByName("Domain")[0] as HTMLInputElement).value;
        const ProgramLangue = (document.getElementsByName("ProgramLangue")[0] as HTMLSelectElement).value;
        const Framework = (document.getElementsByName("Framework")[0] as HTMLSelectElement).value;

        try {
            setLoading(true); // เริ่ม loading
            const res = await fetch(`${BASE_URL}/api/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${yourToken}`,
                },
                body: JSON.stringify({
                    domain_name: Domain,
                    programming_language: ProgramLangue,
                    framework: Framework,
                    is_verified: "false",
                    ssl_enabled: "false"
                })
            });
            
            const result = await res.json();
            console.log(result);

            if (res.ok) {
                reloadNginx()
                router.push("/dashboard");
            } else {
                alert("Deploy failed: " + (result.message || "Unknown error"));
            }
        } catch (error) {
            console.error("Error during deploy:", error);
            alert("An error occurred while deploying.");
        } finally {
            setLoading(false); // จบ loading
        }
    }

    const [selected, setSelected] = useState<"git" | "zip" | "manual" | null>("git");
    const [repoURL, setRepoURL] = useState("");
    const [files, setFiles] = useState<FileList | null>(null);

    const [sslEnabled, setSslEnabled] = useState(true);
    const [advancedSettings, setAdvancedSettings] = useState(false);

    const buttonClass = (type: string) =>
        `flex-1 py-3 text-center cursor-pointer rounded-md border transition ${selected === type
            ? "bg-[#1e293b] border-orange-500 text-orange-400"
            : "bg-[#0f172a] border-[#334155] text-white hover:border-orange-500"
        }`;

    const [domain, setDomain] = useState("");
    const [error, setError] = useState("");

   const validateDomain = (value: string) => {
    // อนุญาตตัวอักษร, ตัวเลข, ขีดกลาง (-) และ จุด (.)
    const regex = /^[a-zA-Z0-9.-]+$/;
    if (!value) {
        setError("Domain is required.");
    } else if (!regex.test(value)) {
        setError("Only letters, numbers, hyphens (-), and dots (.) are allowed.");
    } else {
        setError("");
    }
    setDomain(value);
};


    useEffect(() => {
        reFramework;
    }, []);

    return (
        <div className="min-h-screen bg-[#0f172a] text-white py-10 px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                {/* Basic Settings */}
                <div className="bg-[#1e293b] p-8 rounded-2xl shadow-xl w-full">
                    <h2 className="text-2xl font-bold text-orange-400 mb-6">📄 Basic Configuration</h2>

                    <input
                        type="text"
                        name="Domain"
                        placeholder="Enter domain name (no dot or special chars)"
                        value={domain}
                        onChange={(e) => validateDomain(e.target.value)}
                        className={`w-full px-4 py-3 mb-2 rounded-lg border ${error ? "border-red-500" : "border-gray-700"} bg-[#0f172a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${error ? "focus:ring-red-500" : "focus:ring-orange-500"}`}
                    />
                    {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

                    <select
                        name="ProgramLangue"
                        onChange={reFramework}
                        className="w-full px-4 py-3 mb-4 rounded-lg border border-gray-700 bg-[#0f172a] text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        <option value="nodejs">Node.js</option>
                        <option value="htmlstatic">HTML BASIC</option>
                        <option value="go">Go Lang</option>
                        <option value="php">PHP</option>
                    </select>

                    {lang && lang !== "htmlstatic" ? (
                        <select
                            name="Framework"
                            className="w-full px-4 py-3 mb-4 rounded-lg border border-gray-700 bg-[#0f172a] text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            {frameworkOptions[lang]?.map((fw: string) => (
                                <option key={fw} value={fw.toLowerCase()}>
                                    {fw}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <select
                            name="Framework"
                            className="w-full px-4 py-3 mb-4 rounded-lg border border-gray-700 bg-[#0f172a] text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="null">No framework needed for static HTML.</option>
                        </select>
                    )}
                </div>

                {/* Deployment Source */}
                <div className="bg-[#1e293b] p-8 rounded-2xl shadow-xl w-full">
                    <h2 className="text-2xl font-bold text-orange-400 mb-6">⚙️ Deployment Source</h2>

                    <div className="flex gap-2 mb-6">
                        <div className={buttonClass("git")} onClick={() => setSelected("git")}>
                            <div className="font-semibold">Git</div>
                            <div className="text-sm text-gray-400">From repository</div>
                        </div>
                        <div className={buttonClass("zip")} onClick={() => setSelected("zip")}>
                            <div className="font-semibold">ZIP</div>
                            <div className="text-sm text-gray-400">Upload archive</div>
                        </div>
                        <div className={buttonClass("manual")} onClick={() => setSelected("manual")}>
                            <div className="font-semibold">Manual</div>
                            <div className="text-sm text-gray-400">Upload folder</div>
                        </div>
                    </div>

                    {selected === "git" && (
                        <div className="space-y-2">
                            <label htmlFor="repo-url" className="text-sm text-gray-300">
                                Repository URL
                            </label>
                            <input
                                id="repo-url"
                                type="text"
                                value={repoURL}
                                onChange={(e) => setRepoURL(e.target.value)}
                                placeholder="https://github.com/username/project.git"
                                className="w-full px-4 py-3 rounded-md bg-[#0f172a] text-white border border-gray-600 focus:outline-none focus:border-orange-400"
                            />
                        </div>
                    )}

                    {selected === "zip" && (
                        <div className="space-y-2">
                            <label className="text-sm text-gray-300">
                                Upload ZIP File
                            </label>
                            <input
                                type="file"
                                accept=".zip,.tar,.gz"
                                onChange={(e) => setFiles(e.target.files)}
                                className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600"
                            />
                            {files && <p className="text-sm text-green-400">📦 {files[0]?.name}</p>}
                        </div>
                    )}

                    {selected === "manual" && (
                        <div className="space-y-2">
                            <label className="text-sm text-gray-300">Upload Folder</label>
                            <input
                                type="file"
                                onChange={(e) => setFiles(e.target.files)}
                                className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600"
                                {...({
                                    webkitdirectory: "",
                                    directory: "",
                                } as any)}
                            />
                            {files && (
                                <ul className="text-sm text-green-400 mt-2 space-y-1 max-h-40 overflow-auto">
                                    {Array.from(files).map((file, index) => (
                                        <li key={index}>📄 {file.webkitRelativePath}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Resources & Security เต็มความกว้าง */}
            <div className="max-w-7xl mx-auto mt-6">
                <div className="bg-[#1e293b] p-8 rounded-2xl shadow-xl w-full">
                    <h2 className="text-2xl font-bold text-orange-400 mb-6">🛡️ Resources & Security</h2>

                    {/* SSL Certificate */}
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-white font-semibold">SSL Certificate</p>
                            <p className="text-gray-400 text-sm">Enable HTTPS encryption</p>
                        </div>
                        <div
                            onClick={() => setSslEnabled(!sslEnabled)}
                            className={`w-12 h-6 flex items-center bg-gray-600 rounded-full p-1 cursor-pointer transition duration-300 ${sslEnabled ? 'bg-orange-500' : 'bg-gray-600'}`}
                        >
                            <div
                                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ${sslEnabled ? 'translate-x-6' : ''}`}
                            ></div>
                        </div>
                    </div>

                    {/* Advanced Settings */}
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white font-semibold">Advanced Settings</p>
                            <p className="text-gray-400 text-sm">Custom build commands & more</p>
                        </div>
                        <div
                            onClick={() => setAdvancedSettings(!advancedSettings)}
                            className={`w-12 h-6 flex items-center bg-gray-600 rounded-full p-1 cursor-pointer transition duration-300 ${advancedSettings ? 'bg-orange-500' : 'bg-gray-600'}`}
                        >
                            <div
                                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ${advancedSettings ? 'translate-x-6' : ''}`}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Deploy Button */}
            <div className="max-w-7xl mx-auto mt-6 relative">
                <button
                    onClick={() => {
                        if (error || !domain) {
                            alert("Please fix domain input before deploying.");
                            return;
                        }
                        deploy();
                    }}
                    disabled={!!error || !domain || loading}
                    className={`w-full font-semibold py-3 px-6 rounded-xl transition duration-200 text-lg ${!!error || !domain || loading
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-orange-500 hover:bg-orange-600 text-white"
                        }`}
                >
                    {loading ? "Deploying..." : "🚀 Deploy"}
                </button>


            </div>
            {loading && (
                <Loading text="Deploying your application..." />
            )}
        </div>
    );
}
