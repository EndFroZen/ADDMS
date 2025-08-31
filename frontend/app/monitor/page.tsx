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

export default function Monitoring() {
    const [data, setData] = useState<{ time: string; ram: number; cpu: number }[]>([]);

    useEffect(() => {
        const now = new Date();
        const simulatedData = Array.from({ length: 36 }, (_, i) => {
            const past = new Date(now);
            past.setMinutes(now.getMinutes() - (35 - i) * 5); // ย้อนหลังทุก 5 นาที
            
            const hours = past.getHours().toString().padStart(2, "0");
            const minutes = past.getMinutes().toString().padStart(2, "0");

            return {
                time: `${hours}:${minutes}`, // แสดงแบบ HH:mm
                ram: Math.floor(Math.random() * 100),
                cpu: Math.floor(Math.random() * 100),
            };
        });
        setData(simulatedData);
    }, []);

    return (
        <div className="bg-gradient-to-br from-orange-50 via-white to-orange-100 min-h-screen flex">
            <Sidebar />
            
            <div className="w-full p-4 gap-2 flex flex-col">
                <h2 className="text-2xl font-bold text-orange-500">Monitoring</h2>
                
                {/* RAM Usage */}
                <div className="bg-gray-100 border border-gray-300 p-4 rounded-lg ">
                    <h3 className="text-lg font-semibold text-blue-400 mb-2">RAM Usage (%)</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#C2C0C0" />
                            <XAxis dataKey="time" stroke="black" minTickGap={30} />
                            <YAxis stroke="#fff" />
                            <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff' }} />
                            <Area
                                type="linear"
                                dataKey="ram"
                                stroke="rgb(96 165 250 / var(--tw-text-opacity, 1))"
                                strokeWidth={2}
                                fill="rgb(96 165 250 / var(--tw-text-opacity, 0.2))"
                                dot={{ r: 4, fill: "rgb(96 165 250 / var(--tw-text-opacity, 1))" }} // ไม่ให้จุดแน่นเกินไป
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
                            <YAxis stroke="#fff" />
                            <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff' }} />
                            <Area
                                type="linear"
                                dataKey="cpu"
                                stroke="rgb(34 197 94 / var(--tw-text-opacity, 1))"
                                strokeWidth={2}
                                fill="rgb(34 197 94 / var(--tw-text-opacity, 0.2))"
                                dot={{ r: 4, fill: "rgb(34 197 94 / var(--tw-text-opacity, 1))" }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
