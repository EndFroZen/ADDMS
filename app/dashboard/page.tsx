'use client';
import { useState, useEffect } from "react";
import TopNavigation from "../components/topnavbar/page";
import { NToken } from "@/config/plublicpara";

// Interfaces
interface Domain {
  ID: number;
  Domain_name: string;
  Is_verified: string;
  Ssl_enabled: string;
}

interface Website {
  id: number;
  created_at: string;
  status: string;
  storage_limit: number;
  domain: Domain;
}

interface UserModel {
  email: string;
  folder: string;
  name: string;
  storage: number;
  website: Website[];
}

export default function Dashboard() {
  const [user, setUser] = useState<UserModel | null>(null);
  const yourToken = typeof window !== 'undefined' ? localStorage.getItem(NToken) : null;
  const page = "dashboard";

  async function loadUser() {
    try {
      const res = await fetch("https://addms.endfrozen.site/api/dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${yourToken}`,
        },
      });

      const result = await res.json();
      console.log("API result:", result);

      if (res.status === 200) {
        setUser(result);
      }
    } catch (err) {
      console.log("Failed to fetch user:", err);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="bg-blue-900 min-h-screen text-white">
      <TopNavigation page={page} />

      <div className="p-6 max-w-6xl mx-auto">
        {user ? (
          <>
            <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}</h1>
            <div className="mb-6 text-lg">
              <p>Email: {user.email}</p>
              <p>Folder: {user.folder}</p>
              <p>Storage Used: {user.storage.toFixed(2)} MB</p>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Your Websites</h2>
            {user.website.length === 0 ? (
              <p>No websites found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.website.map((site) => (
                  <div key={site.id} className="bg-blue-800 rounded-xl p-4 shadow-lg">
                    <h3 className="text-xl font-semibold mb-2">{site.domain.Domain_name}</h3>
                    <p>Status: <span className={site.status === "offline" ? "text-red-400" : "text-green-400"}>{site.status}</span></p>
                    <p>Storage Limit: {site.storage_limit} MB</p>
                    <p>Verified: {site.domain.Is_verified === "true" ? "Yes" : "No"}</p>
                    <p>SSL Enabled: {site.domain.Ssl_enabled === "true" ? "Yes" : "No"}</p>
                    <p className="text-sm text-gray-300 mt-2">Created: {new Date(site.created_at).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
}
