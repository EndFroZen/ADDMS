'use client';
import { useState, useEffect } from 'react';
import './style.css'
import { BASE_URL, NToken } from '@/config/plublicpara';
export default function Create() {
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
    
    async function deploy(){
        const Domain = (document.getElementsByName("Domain")[0] as HTMLInputElement).value
        const ProgramLangue = (document.getElementsByName("ProgramLangue")[0] as HTMLSelectElement).value
        const Framework = (document.getElementsByName("Framework")[0] as HTMLSelectElement).value

        const res = await fetch(`${BASE_URL}/api/create`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                "Authorization": `Bearer ${yourToken}`,
            },
            body: JSON.stringify({
                "domain_name": Domain,
                "programming_language": ProgramLangue,
                "framework": Framework,
                "is_verified": "false",
                "ssl_enabled": "false"})
        })
        const result = await res.json()
        console.log(Domain, ProgramLangue, Framework)
        console.log(result)
    }

    useEffect(() => {
        reFramework
    }, [])

    
    return (
        <body>
            <div className="basicSetting">
                <h2>Basic</h2>
                <input type="text" name="Domain" placeholder="domain.addms.click" />

                <select name="ProgramLangue" onChange={reFramework}>
                    <option value="nodejs">Node.js</option>
                    <option value="htmlstatic">HTML BASIC</option>
                    <option value="go">Go Lang</option>
                    <option value="php">PHP</option>
                </select>

                <div className="">
                    {lang && lang !== 'htmlstatic' ? (
                        <select name="Framework">
                            {frameworkOptions[lang]?.map((fw) => (
                                <option key={fw} value={fw.toLowerCase()}>{fw}</option>
                            ))}
                        </select>
                    ) : lang === 'htmlstatic' ? (
                        <select name="Framework">
                            <option value="null">No framework needed for static HTML.</option>
                        </select>
                    ) : null}
                </div>
            </div>
            <button onClick={deploy}>deploy</button>
        </body>
    );
}
