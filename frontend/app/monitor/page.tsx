'use client';
import { useState, useEffect } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import Sidebar from "../components/sidebar";
import "../../app/globals.css";
import { BASE_URL, NToken } from "@/config/plublicpara";

export default function Monitoring() {
    const [data, setData] = useState<{ time: string; ram: number; cpu: number }[]>([]);

    async function loadResource() {
        try {
            const yourToken = typeof window !== "undefined" ? localStorage.getItem(NToken) : null;

            const res = await fetch(`${BASE_URL}/api/getresource`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${yourToken}`,
                },
            });

            const result = await res.json();
            console.log("API Result:", result);

            // ตรวจสอบว่ามีข้อมูลใน resource array หรือไม่
            if (result.resource && result.resource.length > 0) {
                // แปลงข้อมูลทั้งหมดจาก API มาแสดงใน chart
                const allEntries = result.resource.map((item: any) => ({
                    time: new Date(item.Timestamp).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit"
                    }),
                    ram: item.RamUsage,
                    cpu: item.CpuUsage,
                })).reverse(); // reverse เพื่อให้เรียงจากเก่าไปใหม่ (เก่าสุดซ้าย ใหม่สุดขวา)

                // ใช้ข้อมูลทุกจุดที่ API ส่งมา
                setData(allEntries);
            }
        } catch (error) {
            console.error("Error fetching resource data:", error);
        }
    }

    useEffect(() => {
        // โหลดข้อมูลครั้งแรก
        loadResource();

        // โหลดซ้ำทุก 5 วินาที
        const interval = setInterval(loadResource, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-gradient-to-br from-orange-50 via-white to-orange-100 min-h-screen flex">
            <Sidebar />

            <div className="w-full p-4 gap-2 flex flex-col">
                <h2 className="text-2xl font-bold text-orange-500">Monitoring</h2>

                {/* RAM Usage */}
                <div className="bg-gray-100 border border-gray-300 p-4 rounded-lg ">
                    <h3 className="text-lg font-semibold text-blue-400 mb-2">RAM Usage (MB)</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#C2C0C0" />
                            <XAxis dataKey="time" stroke="black" minTickGap={30} />
                            <YAxis stroke="#000" />
                            <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff' }} />
                            <Area
                                type="linear"
                                dataKey="ram"
                                stroke="rgb(96 165 250)"
                                strokeWidth={2}
                                fill="rgba(96,165,250,0.2)"
                                dot={{ r: 3, fill: "rgb(96 165 250)" }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* CPU Usage */}
                <div className="bg-gray-100 border border-gray-300 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-500 mb-2">CPU Usage (%)</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#C2C0C0" />
                            <XAxis dataKey="time" stroke="black" minTickGap={30} />
                            <YAxis stroke="#000" />
                            <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff' }} />
                            <Area
                                type="linear"
                                dataKey="cpu"
                                stroke="rgb(34 197 94)"
                                strokeWidth={2}
                                fill="rgba(34,197,94,0.2)"
                                dot={{ r: 3, fill: "rgb(34 197 94)" }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}