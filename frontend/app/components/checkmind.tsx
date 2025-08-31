'use client' 
import { useEffect } from "react";

type CheckmindProps = {
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function Checkmind({ message = "Are you sure?", onConfirm, onCancel }: CheckmindProps) {
  // ปิดด้วยปุ่ม Esc
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onCancel]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 text-center w-[320px]">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{message}</h2>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
