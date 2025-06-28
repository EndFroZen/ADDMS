"use client";
import { BASE_URL, NToken } from "@/config/plublicpara";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  async function load() {
    const yourToken = typeof window !== "undefined" ? localStorage.getItem(NToken) : null;

    const res = await fetch(`${BASE_URL}/api/dashboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${yourToken}`,
      },
    });

    const result = await res.json();
    setUser(result);
  }

  async function deleteWebsite(id: number) {
    const yourToken = typeof window !== "undefined" ? localStorage.getItem(NToken) : null;

    const res = await fetch(`${BASE_URL}/api/website/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${yourToken}`,
      },
    });

    if (res.ok) {
      setUser((prev: any) => ({
        ...prev,
        website: prev.website.filter((site: any) => site.id !== id),
      }));
    } else {
      alert("Failed to delete website.");
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (!user) return <p className="text-white p-4">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>
      <p className="text-gray-400 mb-1">Email: {user.email}</p>
      <p className="text-gray-400 mb-6">
        Storage used: {user.storage.toFixed(2)} MB
      </p>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Your Websites</h2>
        <div className="space-y-4">
          {user.website.map((site: any) => (
            <div
              key={site.id}
              className="bg-[#1e293b] rounded-lg p-4 shadow-md border border-gray-700"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-orange-400">
                  {site.domain.Domain_name}
                </span>
                <span
                  className={`text-sm px-2 py-0.5 rounded ${
                    site.status === "offline"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {site.status}
                </span>
              </div>

              <div className="text-sm text-gray-400 space-y-1 mb-3">
                <p>Created: {new Date(site.created_at).toLocaleString()}</p>
                <p>SSL Enabled: {site.domain.Ssl_enabled}</p>
                <p>Verified: {site.domain.Is_verified}</p>
                <p>Storage Limit: {site.storage_limit} MB</p>
              </div>

              <button
                onClick={() => deleteWebsite(site.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm rounded transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      <a
        href="../create"
        className="inline-block bg-gradient-to-r from-orange-400 to-orange-500 px-4 py-2 rounded-md text-white font-medium hover:opacity-90 transition"
      >
        + New Deploy
      </a>
    </div>
  );
}
