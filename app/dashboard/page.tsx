'use client';
import { useState, useEffect } from "react";

export default function Dashboard() {
  
  

  return (
    <div className="flex h-screen bg-slate-900 text-white">
      {/* ช่องที่ 1 - SideNav */}
      <nav className="w-[10%] bg-red-900 p-4">
        <h2 className="text-lg font-bold mb-4">Menu</h2>
        {/* ตัวอย่างเมนู */}
        <ul>
          <li className="mb-2 cursor-pointer hover:text-yellow-400">Dashboard</li>
          <li className="mb-2 cursor-pointer hover:text-yellow-400">Settings</li>
          <li className="mb-2 cursor-pointer hover:text-yellow-400">Profile</li>
        </ul>
      </nav>

      {/* ช่องที่ 2 - รายการเว็บไซต์ */}
      <section className="w-[30%] bg-fuchsia-900 p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Your Websites</h2>
        {user && user.website.length > 0 ? (
          <ul>
            {user.website.map((site) => (
              <li
                key={site.id}
                onClick={() => setSelectedWebsite(site)}
                className={`p-3 mb-3 rounded cursor-pointer ${
                  selectedWebsite?.id === site.id ? "bg-yellow-600" : "bg-fuchsia-700"
                } hover:bg-yellow-500`}
              >
                <div className="font-semibold">{site.domain.Domain_name}</div>
                <div className="text-sm">Status: {site.status}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No websites found.</p>
        )}
      </section>

      {/* ช่องที่ 3 - รายละเอียดเว็บไซต์ที่เลือก */}
      <section className="w-[60%] bg-yellow-500 p-4 overflow-y-auto">
        {selectedWebsite ? (
          <>
            <h2 className="text-2xl font-bold mb-4">{selectedWebsite.domain.Domain_name}</h2>
            <p><strong>Status:</strong> {selectedWebsite.status}</p>
            <p><strong>Storage Limit:</strong> {selectedWebsite.storage_limit} MB</p>
            <p><strong>Framework:</strong> {selectedWebsite.framwork}</p>
            <p><strong>Programming Language:</strong> {selectedWebsite.programinglangue}</p>
            <p><strong>Created At:</strong> {new Date(selectedWebsite.created_at).toLocaleString()}</p>
            <p><strong>SSL Enabled:</strong> {selectedWebsite.domain.Ssl_enabled}</p>
            <p><strong>Verified:</strong> {selectedWebsite.domain.Is_verified}</p>
          </>
        ) : (
          <p>Please select a website to see details.</p>
        )}
      </section>
    </div>
  );
}
