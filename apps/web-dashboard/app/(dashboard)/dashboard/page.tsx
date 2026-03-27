'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth';

export default function DashboardPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user) {
      // Redirect based on role
      router.push('/dashboard/properties');
    }
  }, [user, router]);

  return (
    <div className="flex items-center justify-center h-[50vh]">
      <p className="text-gray-500">Redirecționare...</p>
    </div>
  );
}
