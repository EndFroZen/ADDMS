'use client';
import { useState, useEffect } from 'react';
import './style.css'
export default function Create() {
    const [lang, setLang] = useState('nodejs');

    function reFramework(e: React.ChangeEvent<HTMLSelectElement>) {
        setLang(e.target.value);
    }

    const frameworkOptions: { [key: string]: string[] } = {
        nodejs: ['Express', 'Fastify', 'NestJS', 'Koa'],
        go: ['Gin', 'Fiber', 'Echo', 'Chi'],
        php: ['Laravel', 'Symfony', 'CodeIgniter', 'Slim'],
    };
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

                <div className="framework">
                    {lang && lang !== 'htmlstatic' ? (
                        <select name="framework">
                            {frameworkOptions[lang]?.map((fw) => (
                                <option key={fw} value={fw.toLowerCase()}>{fw}</option>
                            ))}
                        </select>
                    ) : lang === 'htmlstatic' ? (
                        <p>No framework needed for static HTML.</p>
                    ) : null}
                </div>
            </div>
        </body>
    );
}
