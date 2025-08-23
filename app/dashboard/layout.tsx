import Sidebar from "../components/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-white text-black">
            <Sidebar />
            <main className="flex-1 p-6 border-l">{children}</main>
        </div>
    );
}
