'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BASE_URL, NToken } from '@/config/plublicpara';

export default function Create() {
    const router = useRouter();
    const [lang, setLang] = useState('nodejs');
    const yourToken = typeof window !== 'undefined' ? localStorage.getItem(NToken) : null;

    function reFramework(e: React.ChangeEvent<HTMLSelectElement>) {
        setLang(e.target.value);
    }

    const frameworkOptions: { [key: string]: string[] } = {
        nodejs: ['Express', 'Fastify', 'NestJS', 'Koa'],
        go: ['Gin', 'Fiber', 'Echo', 'Chi'],
        php: ['Laravel', 'Symfony', 'CodeIgniter', 'Slim'],
    };

    async function deploy() {
        const Domain = (document.getElementsByName("Domain")[0] as HTMLInputElement).value;
        const ProgramLangue = (document.getElementsByName("ProgramLangue")[0] as HTMLSelectElement).value;
        const Framework = (document.getElementsByName("Framework")[0] as HTMLSelectElement).value;

        try {
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

            // ✅ Redirect หลังจาก deploy สำเร็จ
            if (res.ok) {
                router.push("/dashboard");
            } else {
                alert("Deploy failed: " + result.message || "Unknown error");
            }
        } catch (error) {
            console.error("Error during deploy:", error);
            alert("An error occurred while deploying.");
        }
    }

    useEffect(() => {
        reFramework
    }, [])

    return (
        <div className="min-h-screen bg-[#111827] text-gray-100 grid justify-center items-start py-8 px-4">
            <div className="bg-[#1f2937] p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-orange-500 mb-6">Basic</h2>

                <input
                    type="text"
                    name="Domain"
                    placeholder="domain.addms.click"
                    className="w-full px-4 py-3 mb-4 rounded-lg border border-gray-700 bg-[#111827] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />

                <select
                    name="ProgramLangue"
                    onChange={reFramework}
                    className="w-full px-4 py-3 mb-4 rounded-lg border border-gray-700 bg-[#111827] text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                    <option value="nodejs">Node.js</option>
                    <option value="htmlstatic">HTML BASIC</option>
                    <option value="go">Go Lang</option>
                    <option value="php">PHP</option>
                </select>

                {lang && lang !== "htmlstatic" ? (
                    <select
                        name="Framework"
                        className="w-full px-4 py-3 mb-4 rounded-lg border border-gray-700 bg-[#111827] text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                        className="w-full px-4 py-3 mb-4 rounded-lg border border-gray-700 bg-[#111827] text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        <option value="null">No framework needed for static HTML.</option>
                    </select>
                )}
            </div>
            
            <button
                onClick={deploy}
                className="w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
                Deploy
            </button>
        </div>
    );
}
