'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from "../../config/plublicpara";
import './style.css'; // We'll create this CSS file
import { useRouter } from 'next/navigation';

interface Domain {
  ID: number;
  Domain_name: string;
  Is_verified: string;
  Ssl_enabled: string;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
}

interface Website {
  id: number;
  status: string;
  storage_limit: number;
  created_at: string;
  domain: Domain;
}

interface DashboardResponse {
  email: string;
  folder: string;
  name: string;
  storage: number;
  website: Website[];
}

export default function Dashboard() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  async function getDashboard() {
    const yourToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/dashboard`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${yourToken}`
        }
      });

      const data = await res.json();
      setDashboardData(data);
    } catch (err) {
      console.error("Error in dashboard:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDashboard();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (!dashboardData) return <div className="error">Failed to load data</div>;

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">A</div>
        <nav>
          <a href="#" className="active">Dashboard</a>
          <a href="#">Websites</a>
          <a href="#">Servers</a>
          <a href="#">Team</a>
          <a href="#">Settings</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main">
        {/* Header */}
        <header>
          <div className="search">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="user">
            <div className="avatar">{dashboardData.name.charAt(0)}</div>
            <span>{dashboardData.name}</span>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="content">
          <h1>Dashboard</h1>
          
          {/* Stats */}
          <div className="stats">
            <div className="stat-card">
              <h3>Total Websites</h3>
              <p>{dashboardData.website.length}</p>
            </div>
            <div className="stat-card">
              <h3>Active Servers</h3>
              <p>{dashboardData.website.filter(w => w.status === 'online').length}</p>
            </div>
            <div className="stat-card">
              <h3>Storage Used</h3>
              <p>{dashboardData.storage} MB</p>
            </div>
          </div>

          {/* Websites List */}
          <h2>Your Websites</h2>
          <div className="websites">
            {dashboardData.website.map(site => (
              <div key={site.id} className="website-card">
                <div className="website-header">
                  <span className={`status ${site.status}`}></span>
                  <h3>{site.domain.Domain_name}</h3>
                </div>
                <p>Status: {site.status}</p>
                <p>Storage: {site.storage_limit} MB</p>
                <p>Created: {new Date(site.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}