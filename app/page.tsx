'use client';

import { useRouter } from 'next/navigation';

export default function ADDMSboard() {
  const router = useRouter();

  function goPage(path: string) {
    router.push(path); // ไปยัง path ที่ต้องการ
  }

  return (
    <div className="welcompage">
      <button onClick={() => goPage('/login')}>
        Login
      </button>
      <button onClick={() => goPage('/register')}>
        Register
      </button>
    </div>
  );
}
