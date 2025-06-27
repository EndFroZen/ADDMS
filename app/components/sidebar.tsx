// components/Sidebar.tsx
import {
    LayoutDashboard,
    Star,
    Server,
    Users,
    Settings,
} from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
    return (
        <div className="h-screen w-60 bg-[#0f172a] text-white flex flex-col px-4 py-6">
            <div className="mb-6 text-xl font-bold tracking-wide">ADDMS</div>

            <nav className="flex flex-col space-y-2">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#1e293b] transition"
                >
                    <LayoutDashboard className="w-5 h-5" />
                    <span>Dashboard</span>
                </Link>

                <Link
                    href="/websites"
                    className="flex items-center gap-3 px-3 py-2 rounded-md bg-[#1e293b] border-l-4 border-orange-500"
                >
                    <Star className="w-5 h-5" />
                    <span>Websites</span>
                </Link>

                <Link
                    href="/servers"
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#1e293b] transition"
                >
                    <Server className="w-5 h-5" />
                    <span>Servers</span>
                </Link>

                <Link
                    href="/team"
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#1e293b] transition"
                >
                    <Users className="w-5 h-5" />
                    <span>Team</span>
                </Link>

                <Link
                    href="/settings"
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#1e293b] transition"
                >
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                </Link>
            </nav>
        </div>
    );
}
