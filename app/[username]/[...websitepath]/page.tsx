'use client';

import { BASE_URL, NToken } from "@/config/plublicpara";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type FileItem = {
  name: string;
  path: string;
  type: string;
  size: number;
  modified: string;
  content?: string;
};

export default function ThisWebsite() {
  const params = useParams();
  const username = params.username;
  const webPathArray = (params.websitepath as string[]) || [];
  const path = '/' + webPathArray.join('/');
  const yourToken = typeof window !== 'undefined' ? localStorage.getItem(NToken) : null;
  const router = useRouter();

  const [files, setFiles] = useState<FileItem[]>([]);
  const [singleFile, setSingleFile] = useState<FileItem | null>(null);

  async function LoadFiles() {
    try {
      const res = await fetch(`${BASE_URL}/api/file/${path}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${yourToken}`,
        },
      });
      const result = await res.json();

      if (Array.isArray(result.data)) {
        setFiles(result.data);
        setSingleFile(null);
      } else if (typeof result.data === 'object') {
        setSingleFile(result.data);
        setFiles([]);
      }
    } catch (err) {
      console.log("Failed to fetch files:", err);
    }
  }

  useEffect(() => {
    LoadFiles();
  }, [path]); // เพิ่ม path เป็น dependency เพื่อโหลดใหม่เมื่อเปลี่ยน path

  return (
    <div className="bg-slate-900 min-h-screen text-white p-8 font-sans">
      <h1 className="text-xl font-extrabold mb-6 tracking-tight">
        Content in{' '}
        <span>
          {path.split('/').filter(Boolean).map((segment, i, arr) => {
            const href = `/${username}/` + arr.slice(0, i + 1).join('/');
            return (
              <span key={href} className="select-text">
                <a
                  href={href}
                  className="text-blue-400 hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(href);
                  }}
                >
                  /{segment}
                </a>
                {i < arr.length - 1 && <span className="text-slate-500">  </span>}
              </span>
            );
          })}
        </span>
      </h1>

      {singleFile ? (
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg max-w-full mx-auto">
          <p className="mb-6 text-xl font-semibold select-text flex items-center gap-2">
            <span className="text-blue-400 text-2xl">📄</span> {singleFile.name}
          </p>

          <div className="bg-[#0d1117] rounded-lg overflow-x-auto max-h-[600px] text-sm font-mono border border-slate-700 shadow-inner">
            {singleFile.content?.split('\n').map((line, i) => (
              <div
                key={i}
                className="flex select-text"
                style={{ minHeight: '1.6em', lineHeight: '1.6em' }}
              >
                {/* เลขบรรทัด */}
                <div
                  className="select-none text-slate-500 text-right pr-5 pl-4 border-r border-slate-700"
                  style={{ userSelect: 'none', minWidth: '3.5em', fontSize: '0.85rem' }}
                >
                  {i + 1}
                </div>
                {/* โค้ดบรรทัด */}
                <pre
                  className="whitespace-pre-wrap break-words px-5 py-1 text-white flex-1 m-0"
                  style={{ fontFamily: 'ui-monospace, SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace', fontSize: '0.875rem' }}
                >
                  {line || '\u00A0'}
                </pre>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <ul className="space-y-4 max-w-4xl mx-auto">
          {files
            .filter(file => file.type === 'file' || file.type === 'folder')
            .map((file, index) => (
              <li
                key={index}
                className="text-lg cursor-pointer hover:underline flex items-center gap-2 select-text max-w-full break-words"
                onClick={() => {
                  const nextPath = [...webPathArray, file.name].join('/');
                  router.push(`/${username}/${nextPath}`);
                }}
              >
                {file.type === 'folder' ? (
                  <span className="text-yellow-400 text-xl select-none">📁</span>
                ) : (
                  <span className="text-cyan-400 text-xl select-none">📄</span>
                )}
                <span>{file.name}</span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
