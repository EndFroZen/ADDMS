'use client';

import { useEffect, useState } from 'react';
import { BASE_URL } from "../../../config/plublicpara";
import { useRouter } from 'next/navigation';


interface UserData {
  status: number;
  username: string;
  email: string;
  folder: string;
  role: string;
}

interface Props {
  params: {
    username: string;
    domain: string;
  };
}

export default function WebsitePage({ params }: Props) {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const { username, domain } = params;

  const yourToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  async function checkUser() {
    try {
      const res = await fetch(`${BASE_URL}/api/datauser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${yourToken}`
        }
      });

      if (res.status === 200) {
        const data: UserData = await res.json();
        setDashboardData(data);
        if(data.username !== username){
          router.push('/errorpage/404')
        }
        
      } else {
        router.push('/errorpage/404')
      }
      
    } catch (err) {
      console.error("Error fetching user data:", err);
      router.push('/errorpage/404')
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!dashboardData) {
    return <div>No user data available.</div>;
  }

  return (
    <div>
      <h1>เว็บไซต์ของผู้ใช้: {username}</h1>
      <p>Domain: {domain}</p>
      <h2>ข้อมูลผู้ใช้</h2>
      <p>Username: {dashboardData.username}</p>
      <p>Email: {dashboardData.email}</p>
      <p>Folder: {dashboardData.folder}</p>
      <p>Role: {dashboardData.role}</p>
    </div>
  );
}
