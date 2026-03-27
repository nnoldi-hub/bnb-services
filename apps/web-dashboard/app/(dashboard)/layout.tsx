'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/stores/auth';
import { apiClient } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Building2, ClipboardList, Users, Settings, LogOut } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    apiClient.logout();
    logout();
    router.push('/login');
  };

  if (!user) {
    router.push('/login');
    return null;
  }

  const navigation = [
    { name: 'Proprietăți', href: '/dashboard/properties', icon: Building2 },
    { name: 'Taskuri', href: '/dashboard/tasks', icon: ClipboardList },
    ...(user.role !== 'TEAM_MEMBER'
      ? [{ name: 'Echipă', href: '/dashboard/team', icon: Users }]
      : []),
    { name: 'Setări', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="flex h-16 items-center justify-center border-b px-4">
          <h1 className="text-xl font-bold text-gray-800">BNB Services</h1>
        </div>

        <div className="flex flex-col justify-between h-[calc(100vh-4rem)]">
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <Icon className="mr-3 h-5 w-5 shrink-0 text-gray-400 group-hover:text-gray-500" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="border-t p-4">
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-900">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-gray-500">{user.email}</p>
              <p className="text-xs text-gray-400 mt-1">
                {user.role === 'OWNER' && 'Proprietar'}
                {user.role === 'TEAM_MEMBER' && 'Membru Echipă'}
                {user.role === 'ADMIN' && 'Administrator'}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Deconectare
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
