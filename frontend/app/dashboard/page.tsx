"use client";
import { BASE_URL, NToken } from "@/config/plublicpara";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { Globe, Server, Code2, Pause, Play, RefreshCcw } from "lucide-react";
import { Dialog } from "@headlessui/react";
import { s } from "framer-motion/client";
import Loading from "../components/loading";
import "../../app/globals.css";
import Checkmind from "../components/checkmind";
import { error } from "console";
import clsx from "clsx";

interface command { }

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const yourToken = typeof window !== "undefined" ? localStorage.getItem(NToken) : null;
  const [confirmingId, setConfirmingId] = useState<number | null>(null);
  const [hostData, setHostData] = useState<any>(null)
  const [notifications, setNotifications] = useState([]);
  const [selectedNoti, setSelectedNoti] = useState<any>(null);
  const [userResource, setUserResource] = useState<any>(null);

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
  async function loadNotification() {
    const yourToken = typeof window !== "undefined" ? localStorage.getItem(NToken) : null;

    try {
      const res = await fetch(`${BASE_URL}/api/getNotification`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${yourToken}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch notifications");

      const result = await res.json();
      console.log(result);

      // set state เป็น array ของ notifications โดยตรง
      setNotifications(result.notification || []);
    } catch (error) {
      console.error(error);
      setNotifications([]); // fallback
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
    // console.log(result)
    await setUser({
      ...result,
      website: result.website || [],
    });
    loadNotification();
    ResourceLoad();
  }
  const [loadingBtnMap, setLoadingBtnMap] = useState<{ [id: string]: boolean }>({});
  const handleRunServer = async (Command: string, Path: string, siteId: string) => {
    setLoadingBtnMap(prev => ({ ...prev, [siteId]: true }));
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem(NToken) : null;
      const response = await fetch(`${BASE_URL}/api/startserver`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ command: Command, path: Path }),
      });
      if (!response.ok) throw new Error("Failed to run server");
      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingBtnMap(prev => ({ ...prev, [siteId]: false }));
      load();
    }
  };
  const handleStopServer = async (pid: number, siteId: string) => {
    setLoadingBtnMap(prev => ({ ...prev, [siteId]: true }));
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem(NToken) : null;
      const response = await fetch(`${BASE_URL}/api/stopserver`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          "pid": pid
        }),
      });
      if (!response.ok) throw new Error("Failed to run server");
      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingBtnMap(prev => ({ ...prev, [siteId]: false }));
      load();
    }
  };


  const hostLoad = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/hostdata`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const result = await res.json()
        // console.log(result)
        await setHostData({ ...result, "data": result || [] })
      }
    } catch (err) {
      console.log(err)
    }
  }
  const ResourceLoad = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem(NToken) : null;
    try {
      const res = await fetch(`${BASE_URL}/api/userresource`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const result = await res.json()
        // console.log(result)
        await setUserResource(result)
      }
    } catch (err) {
      console.log(err)
    }
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
    hostLoad()
    load();
  }, []);

  if (!user) return <div className="fixed inset-0 flex items-center justify-center z-50 animated-gradient"><Loading text="Loading ..." /></div>;

  const activeWebsites = user.website.length;
  const runningServers = user.website.filter((site: any) => site.status === "online").length;

  return (
    <div className="min-h-screen min-w-screen text-gray-900 relative">
      <div className="mb-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl p-6 text-white shadow-xl flex justify-between items-center ">
        <div className="">
          <h1 className="text-4xl font-bold mb-2">Welcome : {user.name}! 👋</h1>
          <p className="text-orange-100 text-lg">{user.email}</p>
        </div>
        <div className="bg-white p-4 rounded-xl w-full max-w-[25rem]">
          <h1 className="text-2xl font-black text-orange-600 mb-3">Host Information</h1>
          <p className="text-lg text-black flex flex-row gap-2 ">Server: <span className="text-xl font-bold text-orange-500">{hostData.serverhost}</span></p>
          <p className="text-lg text-black flex flex-row gap-2">IP Address: <span className="text-xl font-bold text-orange-500">{hostData.serverhostip}</span></p>
        </div>
      </div>

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
                <p className="text-2xl font-bold text-blue-600 hover:cursor-pointer"
                  title={`Used: ${user.storage} MB\nLimit: ${user.storage_limit} MB\nPercentage: ${(user.storage / user.storage_limit * 100).toFixed(2)}%`}>
                  {user.storage >= 1000
                    ? (user.storage / 1000).toFixed(2) + " GB"
                    : user.storage.toFixed(2) + " MB"}
                  /
                  {user.storage_limit >= 1000
                    ? (user.storage_limit / 1000).toFixed(2) + " GB"
                    : user.storage_limit.toFixed(2) + " MB"}
                </p>

              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-orange-600 mb-4">Resource Usage</h3>
              <button onClick={ResourceLoad} className="bg-gradient-to-r from-orange-400 to-orange-500 hover:opacity-90 text-white font-medium py-2 px-4 rounded-lg shadow transition text-sm">
                Refresh
              </button>
            </div>
            <div className="flex flex-row items-center justify-between px-[10rem]">
              <div className="text-center">
                <p className="text-sm text-gray-600">CPU Usage</p>
                <p className="text-2xl font-bold text-green-600">{userResource?.cpu || 0}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Memory Usage</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Number(userResource?.ram || 0).toFixed(2)} MB
                </p>

              </div>
              {/* <div className="text-center">
                <p className="text-sm text-gray-600">Disk Usage</p>
                <p className="text-2xl font-bold text-purple-600">12 GB</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Websites + System Alerts */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Your Websites & System Alerts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Website List */}
          <div className="md:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow min-h-screen">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {user.website.map((site: any) => (
                  <div
                    key={site.id}
                    className="
    bg-gradient-to-b from-white via-gray-50 to-white 
    p-6 rounded-xl shadow-lg 
    transition-transform transform 
    hover:-translate-y-1 hover:shadow-2xl
    border-2 border-gray-200 hover:border-amber-400
  "
                  >

                    <div className="flex justify-between items-center mb-4">
                      <Link
                        href={`../websites/${user.name}/${site.domain.Domain_name}`}
                        className="text-orange-600 text-lg font-bold hover:underline flex items-center gap-2 overflow-hidden whitespace-nowrap text-ellipsis max-w-[200px]"
                        title={site.domain.Domain_name}
                      >
                        <Globe size={18} />
                        <span className="overflow-hidden text-ellipsis">{site.domain.Domain_name}</span>
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
                        <div><strong>Storage Usage:</strong> {site.storage_limit} MB</div>
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
                      {site.status === "online" ? (<>
                        <button
                          onClick={() => handleStopServer(site.pid, site.id)}
                          disabled={loadingBtnMap[site.id]}
                          className={`${loadingBtnMap[site.id] ? "bg-yellow-200" : "bg-yellow-400"} ${loadingBtnMap[site.id] ? "hover:bg-yellow-300" : "hover:bg-yellow-500"} text-white px-5 py-2 rounded-full text-sm font-medium transition`}
                        >
                          {loadingBtnMap[site.id] ? "please wait ..." : <div className="flex flex-row justify-center items-center gap-1 font-bold"><Pause />Stop server</div>}
                        </button>
                      </>) : (<>
                        <button
                          onClick={() => handleRunServer(site.start_server.Command, site.start_server.Path, site.id)}
                          disabled={loadingBtnMap[site.id]}
                          className={`${loadingBtnMap[site.id] ? "bg-yellow-200" : "bg-green-600"} ${loadingBtnMap[site.id] ? "hover:bg-yellow-300" : "hover:bg-green-700"} text-white px-5 py-2 rounded-full text-sm font-medium transition`}
                        >
                          {loadingBtnMap[site.id] ? "please wait ..." : <div className="flex flex-row justify-center items-center gap-1 font-bold"><Play />Start Server</div>}
                        </button>
                      </>)}


                      <button
                        onClick={() => setConfirmingId(site.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full text-sm font-medium transition"
                      >
                        Delete
                      </button>
                      {confirmingId === site.id && (
                        <div className=""><Checkmind
                          message={`You want to delete ${site.domain.Domain_name}`}
                          onConfirm={() => {
                            deleteWebsite(site.domain.Domain_name);
                            setConfirmingId(null); // ปิด popup หลัง confirm
                          }}
                          onCancel={() => setConfirmingId(null)}
                        /></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* System Alerts */}
          <div className="bg-white p-6 max-h-screen rounded-xl border border-gray-200 shadow">
            <h3 className="text-lg font-medium text-orange-600 mb-4">System Alerts</h3>
            <ul className="space-y-3 text-sm overflow-y-auto text-gray-700 max-h-[90vh]">
              {notifications && notifications.length > 0 ? (
                notifications.map((noti: any) => {
                  const borderColor = clsx({
                    "border-red-400": noti.colorcode === 1,
                    "border-yellow-400": noti.colorcode === 2,
                    "border-sky-400": noti.colorcode === 3,
                    "border-green-400": noti.colorcode === 4,
                  });

                  const bgColor = clsx({
                    "bg-red-50": noti.colorcode === 1,
                    "bg-yellow-50": noti.colorcode === 2,
                    "bg-sky-50": noti.colorcode === 3,
                    "bg-green-50": noti.colorcode === 4,
                  });

                  const iconMap: Record<number, string> = {
                    1: "🚫",
                    2: "⚠️",
                    3: "ℹ️",
                    4: "✅",
                  };
                  const icon = iconMap[noti.colorcode] || "ℹ️";

                  return (
                    <li
                      key={noti.id}
                      className={clsx(
                        "flex items-start p-3 rounded-md border-l-4 cursor-pointer transition-all hover:shadow hover:-translate-y-0.5",
                        borderColor,
                        bgColor
                      )}
                      onClick={() => setSelectedNoti(noti)}
                    >
                      {/* Icon */}
                      <div className="text-xl mr-3">{icon}</div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <strong className="text-gray-800">{noti.title}</strong>
                          <span className="text-xs text-gray-400">{noti.time || "just now"}</span>
                        </div>
                        <p className="text-gray-600 line-clamp-2">{noti.massage}</p>
                      </div>
                    </li>
                  );
                })
              ) : (
                <li className="text-gray-400">No notifications</li>
              )}
            </ul>

            {/* Modal */}
            <Dialog
              open={!!selectedNoti}
              onClose={() => setSelectedNoti(null)}
              className="fixed z-50 inset-0 flex items-center justify-center p-4"
            >
              {/* Overlay */}
              <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

              {/* Panel */}
              <Dialog.Panel className="bg-white rounded-xl shadow-lg max-w-md w-full z-50 p-6 relative">
                <button
                  onClick={() => setSelectedNoti(null)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                  ✖
                </button>

                {selectedNoti && (
                  <>
                    <Dialog.Title className="text-xl font-bold mb-2">
                      {selectedNoti.title}
                    </Dialog.Title>
                    <p className="text-gray-500 mb-4">
                      Type: {selectedNoti.type} | ColorCode: {selectedNoti.colorcode}
                    </p>
                    <pre className="whitespace-pre-wrap bg-gray-100 p-3 rounded-md">
                      {selectedNoti.massage}
                    </pre>
                  </>
                )}
              </Dialog.Panel>
            </Dialog>
          </div>
        </div>
      </div>

      {
        loading && (
          <div className="absolute inset-0 flex items-center justify-center z-50 animated-gradient"><Loading text="Loading ..." /></div>

        )
      }

    </div >
  );
}
