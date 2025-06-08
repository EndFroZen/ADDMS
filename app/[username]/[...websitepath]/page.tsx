'use client';

import { BASE_URL, NToken } from "@/config/plublicpara";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { FileIcon, FolderIcon, ChevronRightIcon } from "@/components/icons"; // คุณต้องสร้างคอมโพเนนต์ไอคอนเหล่านี้

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
// แทนที่การ import ไอคอน
const FileIcon = ({ type, className }: { type: string, className?: string }) => (
  <span className={`${className} text-blue-500`}>📄</span>
);

const FolderIcon = ({ className }: { className?: string }) => (
  <span className={`${className} text-yellow-500`}>📁</span>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <span className={className}>→</span>
);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [singleFile, setSingleFile] = useState<FileItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [breadcrumbs, setBreadcrumbs] = useState<{name: string, path: string}[]>([]);

  async function LoadFiles() {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    LoadFiles();
    
    // สร้าง breadcrumbs
    const crumbs = [];
    let currentPath = '';
    for (const segment of webPathArray) {
      currentPath += `/${segment}`;
      crumbs.push({
        name: segment,
        path: currentPath
      });
    }
    setBreadcrumbs(crumbs);
  }, [path]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i]);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch(extension) {
      case 'js': return 'javascript';
      case 'ts': return 'typescript';
      case 'json': return 'json';
      case 'md': return 'markdown';
      case 'html': return 'html';
      case 'css': return 'css';
      case 'py': return 'python';
      case 'java': return 'java';
      case 'php': return 'php';
      case 'rb': return 'ruby';
      case 'go': return 'go';
      case 'rs': return 'rust';
      case 'sh': return 'shell';
      case 'yml':
      case 'yaml': return 'yaml';
      default: return 'file';
    }
  };

  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans">
      {/* GitHub-like Header */}
      <header className="bg-gray-900 text-white p-4 border-b border-gray-700">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-white font-bold text-xl">GitHub</div>
            <nav className="hidden md:flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">Pull requests</a>
              <a href="#" className="text-gray-300 hover:text-white">Issues</a>
              <a href="#" className="text-gray-300 hover:text-white">Marketplace</a>
              <a href="#" className="text-gray-300 hover:text-white">Explore</a>
            </nav>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search or jump to..." 
                className="bg-gray-800 text-white px-3 py-1 rounded-md text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="text-gray-300 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
            </button>
            <button className="text-gray-300 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
            </button>
            <div className="w-8 h-8 rounded-full bg-gray-700"></div>
          </div>
        </div>
      </header>

      {/* Repository Navigation */}
      <div className="bg-gray-100 border-b border-gray-300 py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center">
          <div className="flex items-center space-x-2 text-sm">
            <a href="#" className="text-blue-600 hover:underline">username</a>
            <ChevronRightIcon className="w-4 h-4 text-gray-500" />
            <a href="#" className="text-blue-600 hover:underline">repository</a>
            <ChevronRightIcon className="w-4 h-4 text-gray-500" />
            <span>main</span>
          </div>
          <div className="ml-auto flex space-x-2">
            <button className="flex items-center space-x-1 text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              <span>Watch</span>
            </button>
            <button className="flex items-center space-x-1 text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
              </svg>
              <span>Fork</span>
            </button>
            <button className="flex items-center space-x-1 text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              <span>Star</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <a href={`/${username}`} className="text-blue-600 hover:underline">
            {username}
          </a>
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center">
              <ChevronRightIcon className="w-4 h-4 mx-1 text-gray-500" />
              <a 
                href={`/${username}${crumb.path}`}
                className="text-blue-600 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/${username}${crumb.path}`);
                }}
              >
                {crumb.name}
              </a>
            </div>
          ))}
        </div>

        {/* File Actions Bar */}
        <div className="bg-gray-50 border border-gray-300 rounded-t-md p-2 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Code
            </button>
            <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-100">
              Issues
            </button>
            <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-100">
              Pull requests
            </button>
            <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-100">
              Actions
            </button>
            <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-100">
              Projects
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-100 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Add file
            </button>
            <button className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Code
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white border border-gray-300 rounded-b-md p-8 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : singleFile ? (
          <div className="bg-white border border-gray-300 rounded-b-md">
            {/* File Header */}
            <div className="border-b border-gray-300 p-3 bg-gray-50 flex justify-between items-center">
              <div className="flex items-center">
                <FileIcon type={getFileIcon(singleFile.name)} className="w-5 h-5 mr-2" />
                <span className="font-medium">{singleFile.name}</span>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-sm text-gray-600 hover:text-blue-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  Raw
                </button>
                <button className="text-sm text-gray-600 hover:text-blue-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                  Download
                </button>
                <button className="text-sm text-gray-600 hover:text-blue-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                  Edit
                </button>
              </div>
            </div>
            
            {/* File Content */}
            <div className="overflow-auto">
              <table className="w-full border-collapse">
                <tbody>
                  {singleFile.content?.split('\n').map((line, i) => (
                    <tr key={i} className="hover:bg-gray-50 group">
                      <td className="px-4 py-1 text-right text-gray-500 select-none border-r border-gray-200 align-top w-10">
                        {i + 1}
                      </td>
                      <td className="px-4 py-1 font-mono text-sm whitespace-pre-wrap break-all">
                        {line || '\u00A0'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-gray-300 rounded-b-md">
            {/* Table Header */}
            <div className="border-b border-gray-300 p-3 bg-gray-50 flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-sm text-gray-600">
                  {files.length} items
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-sm text-gray-600 hover:text-blue-600">
                  Go to file
                </button>
                <button className="text-sm text-gray-600 hover:text-blue-600">
                  Add file
                </button>
                <button className="text-sm text-gray-600 hover:text-blue-600">
                  Code
                </button>
              </div>
            </div>
            
            {/* Files Table */}
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 w-8"></th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Last modified</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Size</th>
                </tr>
              </thead>
              <tbody>
                {files
                  .filter(file => file.type === 'file' || file.type === 'folder')
                  .map((file, index) => (
                    <tr 
                      key={index} 
                      className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        const nextPath = [...webPathArray, file.name].join('/');
                        router.push(`/${username}/${nextPath}`);
                      }}
                    >
                      <td className="px-4 py-3">
                        {file.type === 'folder' ? (
                          <FolderIcon className="w-5 h-5 text-yellow-500" />
                        ) : (
                          <FileIcon type={getFileIcon(file.name)} className="w-5 h-5 text-blue-500" />
                        )}
                      </td>
                      <td className="px-4 py-3 font-medium">
                        <div className="flex items-center">
                          <span className="ml-1">{file.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {formatDate(file.modified)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {file.type === 'file' ? formatFileSize(file.size) : '-'}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Repository Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} GitHub, Inc.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <a href="#" className="hover:text-blue-600 hover:underline">Terms</a>
            <a href="#" className="hover:text-blue-600 hover:underline">Privacy</a>
            <a href="#" className="hover:text-blue-600 hover:underline">Security</a>
            <a href="#" className="hover:text-blue-600 hover:underline">Status</a>
            <a href="#" className="hover:text-blue-600 hover:underline">Help</a>
          </div>
        </div>
      </main>
    </div>
  );
}