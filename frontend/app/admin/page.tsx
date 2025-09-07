"use client"
// import { useState } from "react";
// import Sidebar from "../components/sidebar";
import { Users, Globe} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Admin() {
    // const [selectedCard, setSelectedCard] = useState(null);
    // const [user,setUser]=useState<any>(null)
    const route = useRouter();
    const adminCards = [
        {
            id: 1,
            title: "Manage Users",
            description: "View and manage all user accounts",
            icon: Users,
            color: "from-blue-500 to-blue-600",
            path: "/admin/users",
            
        },
        {
            id: 2,
            title: "Manage Websites",
            description: "View, manage, and control all websites in the system",
            icon: Globe,
            color: "from-green-500 to-green-600",
            path: "/admin/websites",
            
        },
    ];


    return (
        <div className="bg-gradient-to-br from-orange-50 via-white to-orange-100 flex min-h-screen min-w-screen">
            <div className="flex-1 p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin control panel</h1>
                    <p className="text-gray-600">Manage and control your entire system from one place.</p>
                </div>

                {/* Quick Stats */}
                {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Users</p>
                                <p className="text-2xl font-bold text-green-600">127</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <Activity className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Websites</p>
                                <p className="text-2xl font-bold text-blue-600">89</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <Globe className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    
                </div> */}

                {/* Admin Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {adminCards.map((card) => {
                        const IconComponent = card.icon;
                        return (
                            <div
                                key={card.id}
                                onClick={()=>route.push(card.path)}
                                className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-orange-100 
                    hover:border-orange-300`}
                            >
                                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center mb-4`}>
                                    <IconComponent className="w-6 h-6 text-white" />
                                </div>

                                <h3 className="text-lg font-semibold text-gray-800 mb-2">{card.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">{card.description}</p>

                                {/* <div className="flex justify-between items-center">
                                    <span className="text-xs font-medium text-gray-500">{card.stats}</span>
                                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                                        <svg className="w-3 h-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div> */}
                            </div>
                        );
                    })}
                </div>

                {/* Selected Card Info */}
            </div>
        </div>
    );
}