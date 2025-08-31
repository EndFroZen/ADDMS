import Sidebar from "../components/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex bg-gradient-to-br from-orange-50 via-white to-orange-100 ">
            <Sidebar />
            <main className="p-6 w-full">{children}</main>
        </div>
    );
}
