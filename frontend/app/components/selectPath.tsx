import { BASE_URL, NToken } from "@/config/plublicpara";
import { useEffect, useState } from "react";
import Loading from "./loading";
import "../../app/globals.css"

interface FileItem {
  name: string;
  path: string;
  type: "file" | "folder";
  size: number;
  modified: string;
}

interface ApiResponse {
  data: FileItem[];
  message: string;
  path: string;
  status: number;
}

interface SelectPathProps {
  onSelect: (path: string) => void;
  onClose: () => void;
  fullPathTarget: string;
}

export default function SelectPath({ onSelect, onClose, fullPathTarget }: SelectPathProps) {
  const [folders, setFolders] = useState<FileItem[]>([]);
  const [currentPath, setCurrentPath] = useState(fullPathTarget);
  const [selectedPath, setSelectedPath] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [pathHistory, setPathHistory] = useState<string[]>([]);
  const [futurePath, setFuturePath] = useState<string[]>([]);

  // โหลดข้อมูลจาก API
  const getWebsite = async (fullpath: string) => {
    try {
      setIsLoading(true);
      setError("");
      const token = typeof window !== "undefined" ? localStorage.getItem(NToken) : null;
      const response = await fetch(`${BASE_URL}/api/file/${fullpath}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch files");
      }

      const result: ApiResponse = await response.json();
     
      setFolders(result.data.filter((item) => item.type === "folder"));
    } catch (err) {
      setError("Unable to load folders. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // โหลดตอน mount และเมื่อ currentPath เปลี่ยน
  useEffect(() => {
    getWebsite(currentPath);
  }, [currentPath]);

  const handleSelect = () => {
    onSelect(selectedPath || currentPath); // ใช้ currentPath ถ้าไม่ได้เลือก path อื่น
    onClose();
  };

  // ย้อนกลับ (ขึ้นไป path ก่อนหน้า)
  const goUp = () => {
    const parts = currentPath.split("/");
    if (parts.length > 1) {
      // อัปเดตประวัติการนำทาง
      setPathHistory(prev => [...prev, currentPath]);
      setFuturePath([]);

      parts.pop();
      const newPath = parts.join("/") || "/";
      setCurrentPath(newPath);
      setSelectedPath(""); // รีเซ็ตการเลือกเมื่อเปลี่ยน path
    }
  };

  // // ไปข้างหน้า (ถ้ามี)
  // const goForward = () => {
  //   if (futurePath.length > 0) {
  //     const nextPath = futurePath[futurePath.length - 1];
  //     const newFuturePath = futurePath.slice(0, -1);

  //     setPathHistory(prev => [...prev, currentPath]);
  //     setFuturePath(newFuturePath);
  //     setCurrentPath(nextPath);
  //     setSelectedPath("");
  //   }
  // };

  // // กลับไปยัง path ก่อนหน้าในประวัติ
  // const goBack = () => {
  //   if (pathHistory.length > 0) {
  //     const prevPath = pathHistory[pathHistory.length - 1];
  //     const newPathHistory = pathHistory.slice(0, -1);

  //     setFuturePath(prev => [currentPath, ...prev]);
  //     setPathHistory(newPathHistory);
  //     setCurrentPath(prevPath);
  //     setSelectedPath("");
  //   }
  // };

  // ฟังก์ชันสำหรับตัดข้อความยาว
  const truncatePath = (path: string, maxLength: number = 50) => {
    if (path.length <= maxLength) return path;
    return "..." + path.slice(-maxLength);
  };

  // ฟังก์ชันสำหรับเปลี่ยนโฟลเดอร์
  const navigateToFolder = (path: string) => {
    setPathHistory(prev => [...prev, currentPath]);
    setFuturePath([]);
    setCurrentPath(path);
    setSelectedPath("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ">
      <div className="bg-white rounded-xl shadow-xl border p-6 flex flex-col gap-4 w-full max-w-2xl max-h-[90vh]">
        <div className="flex justify-between items-center">
          <h2 className="text-black font-semibold text-lg">Select Folder Path</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-lg"
          >
            ✕
          </button>
        </div>

        <div className="text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
          <div className="font-medium mb-1">Current Path:</div>
          <div className="font-mono break-all" title={currentPath}>
            {truncatePath(currentPath, 60)}
          </div>
          {!selectedPath && (
            <div className="mt-2 text-orange-600 text-xs">
              If no folder is selected, this path will be used.
            </div>
          )}
        </div>

        {/* Navigation controls */}
        <div className="flex gap-2">
          {/* <button
            onClick={goBack}
            disabled={pathHistory.length === 0}
            className={`px-3 py-2 text-sm rounded-lg flex items-center gap-1 ${pathHistory.length === 0 ? 'bg-gray-200 text-gray-400' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            ◀ Back
          </button> */}
          <button
            onClick={goUp}
            disabled={currentPath === '/'}
            className={`px-3 py-2 text-sm rounded-lg flex items-center gap-1 ${currentPath === '/' ? 'bg-gray-200 text-gray-400' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            ⬆ Up
          </button>
          {/* <button
            onClick={goForward}
            disabled={futurePath.length === 0}
            className={`px-3 py-2 text-sm rounded-lg flex items-center gap-1 ${futurePath.length === 0 ? 'bg-gray-200 text-gray-400' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Forward ▶
          </button> */}
        </div>

        {/* Status indicators */}


        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Folder list */}
        <div className="border rounded-lg overflow-hidden flex-grow overflow-y-auto max-h-[300px]">
          {isLoading ? (
            <div className="flex justify-center items-center p-6 animated-gradient">
              <Loading text="Loading..." />
            </div>
          ) : folders.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <div className="text-4xl mb-2">📁</div>
              <p>No folders found in this directory</p>
            </div>
          ) : (
            folders.map((folder) => (
              <div
                key={folder.path}
                className={`px-4 py-3 cursor-pointer select-none transition-all flex items-center gap-3 ${selectedPath === folder.path
                    ? "bg-orange-100 border-l-4 border-orange-500"
                    : "hover:bg-gray-50"
                  }`}
                onClick={() => setSelectedPath(folder.path)}
                onDoubleClick={() => navigateToFolder(folder.path)}
              >
                <div className="text-xl">📁</div>
                <div className="flex-grow">
                  <div className="font-medium">{folder.name}</div>
                  <div className="text-xs text-gray-500 truncate" title={folder.path}>
                    {truncatePath(folder.path, 40)}
                  </div>
                </div>
                {selectedPath === folder.path && <div className="text-blue-500">✓</div>}
              </div>
            ))
          )}
        </div>




        <div className="flex justify-between gap-3 pt-2">
          <div className="">
            <div className="text-sm text-gray-500 self-center">
              Double-click to open folder
            </div>
            {selectedPath && (
              <div className=" text-[10px]">
                <span className="">Selected Path: </span>
                <span className="font-mono break-all" title={selectedPath}>
                  {truncatePath(selectedPath, 60)}
                </span>
              </div>
            )}
          </div>

          {/* Selected path display */}

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSelect}
              className="px-4 py-2 rounded-lg font-medium transition bg-orange-600 text-white hover:bg-orange-700"
            >
              {selectedPath ? "Use Selected Path" : "Use Current Path"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}