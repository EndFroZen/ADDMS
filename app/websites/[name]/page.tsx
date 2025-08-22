'use client'

import Loading from "@/app/components/loading";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ReturnDefaultPage() {
  const router = useRouter();

  useEffect(() => {
    router.push(`/dashboard`);
  }, [router]);

  // แสดง Loader ระหว่าง redirect
  return <Loading />;
}
