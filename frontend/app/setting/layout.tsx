import Sidebar from "../components/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-[#0f172a] text-white">
            <Sidebar />
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}
