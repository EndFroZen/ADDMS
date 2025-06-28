import {LayoutDashboard, Settings,} from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
    return (
        <div className="h-screen w-60 bg-[#0f172a] text-white flex flex-col px-4 py-6">
            <div className="mb-6 text-xl font-bold tracking-wide">ADDMS</div>

            <nav className="flex flex-col space-y-2">
                <Link href="/app/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#1e293b] transition">
                    <LayoutDashboard className="w-5 h-5" />
                    <span>Dashboard</span>
                </Link>

                <Link href="/app/setting" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#1e293b] transition">
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                </Link>
            </nav>
        </div>
    );
}
