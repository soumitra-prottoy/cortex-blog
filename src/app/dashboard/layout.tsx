import { redirect } from 'next/navigation';
import { requireAuth } from '@/lib/auth';
import DashboardSidebar from '@/components/dashboard/sidebar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth();

  return (
    <div className="fixed inset-0 flex z-[100] bg-neutral-950">
      <DashboardSidebar />
      <main className="flex-1 ml-64 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
