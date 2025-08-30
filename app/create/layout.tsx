import Sidebar from "../components/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen  bg-gradient-to-br from-orange-50 via-white to-orange-100 text-white">
            <Sidebar />
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}
