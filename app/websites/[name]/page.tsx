'use client'

import Loading from "@/app/components/loading";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "../../../app/globals.css"

export default function ReturnDefaultPage() {
  const router = useRouter();

  useEffect(() => {
    router.push(`/dashboard`);
  }, [router]);

  // แสดง Loader ระหว่าง redirect
  return <div className="fixed inset-0 flex items-center justify-center z-50 animated-gradient"><Loading text="Loading ..." /></div>;
}
