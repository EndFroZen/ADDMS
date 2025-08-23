"use client";
import { BASE_URL, NToken } from "@/config/plublicpara";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { Globe, Server, Code2 } from "lucide-react";
import { s } from "framer-motion/client";
import Loading from "../components/loading";

interface command { }

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [commnadSave, setCommandSave] = useState<string>("");
  const yourToken = typeof window !== "undefined" ? localStorage.getItem(NToken) : null;

  async function reloadNginx() {
    const res = await fetch(`${BASE_URL}/api/reloadnginx`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${yourToken}`,
      },
    });
    if (!res.ok) {
      alert("Deploy failed: ");
    }
  }

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
    console.log(result)
    setUser({
      ...result,
      website: result.website || [],
    });
  }

  async function runWebsite(path: string, command: string) {
    const yourToken = typeof window !== "undefined" ? localStorage.getItem(NToken) : null;

    await fetch(`${BASE_URL}/api/run/website/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${yourToken}`,
      },
      body: JSON.stringify({ path, command }),
    });

    load();
  }

  async function deleteWebsite(website: string) {
    const yourToken = typeof window !== "undefined" ? localStorage.getItem(NToken) : null;
    setLoading(true);
    await fetch(`${BASE_URL}/api/delete/website/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${yourToken}`,
      },
      body: JSON.stringify({ website }),
    });
    reloadNginx()
    load();
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  if (!user) return <Loading />;

  const activeWebsites = user.website.length;
  const runningServers = user.website.filter((site: any) => site.status === "online").length;

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6 sm:p-10">
      <h1 className="text-3xl font-bold mb-2 text-orange-600">Welcome : {user.name}</h1>
      <p className="text-gray-600 mb-6">Email : {user.email}</p>

      {/* System Overview */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">System Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <h3 className="text-lg font-medium text-orange-600 mb-4">Website Overview</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Active Websites</p>
                <p className="text-2xl font-bold text-orange-600">{activeWebsites}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Running Servers</p>
                <p className="text-2xl font-bold text-green-600">{runningServers}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Storage Used</p>
                <p className="text-2xl font-bold text-blue-600">{user.storage.toFixed(2)} MB</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <h3 className="text-lg font-medium text-orange-600 mb-4">Resource Usage</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">CPU Usage</p>
                <p className="text-2xl font-bold text-green-600">30%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Memory Usage</p>
                <p className="text-2xl font-bold text-blue-600">1.8 GB</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Disk Usage</p>
                <p className="text-2xl font-bold text-purple-600">12 GB</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Websites + System Alerts */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Your Websites & System Alerts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Website List */}
          <div className="md:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-orange-600">Your Websites</h3>
              <Link
                href="../create"
                className="bg-gradient-to-r from-orange-400 to-orange-500 hover:opacity-90 text-white font-medium py-2 px-4 rounded-lg shadow transition text-sm"
              >
                + New Deploy
              </Link>
            </div>

            {activeWebsites === 0 ? (
              <div className="text-gray-600 text-center py-20 text-lg">
                You don't have any websites yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.website.map((site: any) => (
                  <div
                    key={site.id}
                    className="
                      bg-gradient-to-b from-white via-gray-50 to-white 
                      p-6 rounded-xl shadow-lg 
                      transition-transform transform 
                      hover:-translate-y-1 hover:shadow-2xl 
                      border-2 border-transparent hover:border-amber-400
                    "
                  >
                    <div className="flex justify-between items-center mb-4">
                      <Link
                        href={`../websites/${user.name}/${site.domain.Domain_name}`}
                        className="text-orange-600 text-lg font-bold hover:underline flex items-center gap-2"
                      >
                        <Globe size={18} /> {site.domain.Domain_name}
                      </Link>
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold ${site.status === "offline"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                          }`}
                      >
                        {site.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex flex-col gap-2 text-gray-700 text-sm">
                        <div><strong>Created:</strong> {new Date(site.created_at).toLocaleString()}</div>
                        <div><strong>SSL Enabled:</strong> {site.domain.Ssl_enabled ? "Yes" : "No"}</div>
                        <div><strong>Verified:</strong> {site.domain.Is_verified ? "Yes" : "No"}</div>
                        <div><strong>Storage Limit:</strong> {site.storage_limit} MB</div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-gray-700 text-sm">
                          <Server size={14} /> Port: {site.port}
                        </span>
                        <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-gray-700 text-sm">
                          <Code2 size={14} /> Framework: {site.framwork}
                        </span>
                        <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-gray-700 text-sm">
                          <Code2 size={14} /> Language: {site.programinglangue}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => runWebsite()}
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full text-sm font-medium transition"
                      >
                        Run Website
                      </button>
                      <button
                        onClick={() => deleteWebsite(site.domain.Domain_name)}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full text-sm font-medium transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* System Alerts */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow">
            <h3 className="text-lg font-medium text-orange-600 mb-4">System Alerts</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="bg-gray-100 p-3 rounded-md border-l-4 border-yellow-400">
                ⚠️ Backup for <strong>project-x</strong> failed yesterday.
              </li>
              <li className="bg-gray-100 p-3 rounded-md border-l-4 border-red-400">
                🚫 Website <strong>example.com</strong> is offline.
              </li>
              <li className="bg-gray-100 p-3 rounded-md border-l-4 border-green-400">
                ✅ Deployment <strong>portfolio</strong> succeeded!
              </li>
              <li className="bg-gray-100 p-3 rounded-md border-l-4 border-blue-400">
                ℹ️ Update available for <strong>server-core</strong>.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {loading && <Loading text="Loading..." />}
    </div>
  );
}
