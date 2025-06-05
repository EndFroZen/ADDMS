'use client'

import { useEffect, useState, ChangeEvent } from "react"

// Define allowed languages
type Language = 'htmlstatic' | 'nodejs' | 'php' | 'golang'

// Define options mapping from language to its frameworks
const options: Record<Language, string[]> = {
  htmlstatic: ["None Framework"],
  nodejs: ['Express', 'Next.js', 'NestJS'],
  php: ['Laravel', 'CodeIgniter', 'Symfony'],
  golang: ['Gin', 'Fiber', 'Echo'],
}

export default function NewDeploy() {
  const [choice, setChoice] = useState<Language>('htmlstatic')
  const [framework, setFramework] = useState('')
  const [souce, setSouce] = useState('none')

  // State for extra inputs
  const [gitLink, setGitLink] = useState('')
  const [gitBranch, setGitBranch] = useState('main')
  const [zipFile, setZipFile] = useState<File | null>(null)
  const [directory, setDirectory] = useState<FileList | null>(null)

  function getButtonClass(s: string) {
    return s === souce
      ? "bg-orange-600 text-white px-4 py-2 rounded mr-2 transition-colors duration-200"
      : "bg-orange-200 text-orange-800 px-4 py-2 rounded mr-2 hover:bg-orange-300 transition-colors duration-200"
  }

  function funcBgSouce(souceSelect: string) {
    setSouce(souceSelect)
    setGitLink('')
    setGitBranch('main')
    setZipFile(null)
    setDirectory(null)
  }

  useEffect(() => {
    setFramework('')
  }, [choice])

  function handleDeploy() {
    const domain = (document.getElementById('domain') as HTMLInputElement)?.value || ''
    const data = {
      domain,
      language: choice,
      framework,
      source: souce,
      gitLink,
      gitBranch,
      zipFileName: zipFile?.name || null,
      directoryCount: directory?.length || 0,
    }
    console.log('Deploy data:', data)
    alert("Deploy started! ดู console log")
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg space-y-6">
        <h1 className="text-2xl font-extrabold text-orange-700">New Deployment</h1>

        {/* Domain input */}
        <div className="space-y-1">
          <label htmlFor="domain" className="block text-sm font-semibold text-gray-700">Domain</label>
          <input
            type="text"
            id="domain"
            placeholder="example.com"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Programming Language Dropdown */}
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-gray-700">Programming Language</label>
          <select
            value={choice}
            onChange={(e) => setChoice(e.target.value as Language)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="htmlstatic">HTML Static</option>
            <option value="nodejs">Node.js</option>
            <option value="php">PHP</option>
            <option value="golang">Golang</option>
          </select>
        </div>

        {/* Framework Dropdown */}
        {choice && (
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700">Framework</label>
            <select
              value={framework}
              onChange={(e) => setFramework(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {options[choice].map((fw) => (
                <option key={fw} value={fw}>{fw}</option>
              ))}
            </select>
          </div>
        )}

        {/* Source Buttons */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Source</label>
          <div>
            <button onClick={() => funcBgSouce("none")} className={getButtonClass("none")}>None</button>
            <button onClick={() => funcBgSouce("github")} className={getButtonClass("github")}>Github</button>
            <button onClick={() => funcBgSouce("zip")} className={getButtonClass("zip")}>Zip</button>
            <button onClick={() => funcBgSouce("directory")} className={getButtonClass("directory")}>Directory</button>
          </div>
        </div>

        {/* Conditional inputs based on source */}
        {souce === 'github' && (
          <div className="space-y-3 pt-4">
            <label htmlFor="gitLink" className="block text-sm font-semibold text-gray-700">Git Repository URL</label>
            <input
              type="text"
              id="gitLink"
              value={gitLink}
              onChange={(e) => setGitLink(e.target.value)}
              placeholder="https://github.com/username/repo.git"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <label htmlFor="gitBranch" className="block text-sm font-semibold text-gray-700">Branch</label>
            <input
              type="text"
              id="gitBranch"
              value={gitBranch}
              onChange={(e) => setGitBranch(e.target.value)}
              placeholder="main"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        )}

        {souce === 'zip' && (
          <div className="space-y-3 pt-4">
            <label htmlFor="zipFile" className="block text-sm font-semibold text-gray-700">Upload ZIP File</label>
            <input
              type="file"
              id="zipFile"
              accept=".zip"
              onChange={(e) => setZipFile(e.target.files ? e.target.files[0] : null)}
              className="w-full"
            />
            {zipFile && <p className="text-sm text-gray-600 mt-1">Selected file: {zipFile.name}</p>}
          </div>
        )}

        {souce === 'directory' && (
          <div className="space-y-3 pt-4">
            <label htmlFor="directory" className="block text-sm font-semibold text-gray-700">Select Directory</label>
            {/* @ts-ignore */}
            <input
              type="file"
              id="directory"
              // @ts-ignore
              webkitdirectory="true"
              // @ts-ignore
              directory="true"
              multiple
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDirectory(e.target.files)}
              className="w-full"
            />
            {directory && directory.length > 0 && (
              <p className="text-sm text-gray-600 mt-1">{directory.length} files selected</p>
            )}
          </div>
        )}

        {/* Deploy Button */}
        <div className="pt-6">
          <button
            onClick={handleDeploy}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-md transition-colors duration-200"
          >
            Deploy
          </button>
        </div>
      </div>
    </div>
  )
}
