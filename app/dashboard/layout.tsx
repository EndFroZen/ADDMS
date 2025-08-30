import Sidebar from "../components/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 text-black ">
            <Sidebar />
            <main className="p-8 w-full">{children}</main>
        </div>
    );
}
