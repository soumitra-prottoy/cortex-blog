import { redirect } from 'next/navigation';
import { requireAuth } from '@/lib/auth';

export default async function DashboardHomePage() {
  await requireAuth();
  redirect('/dashboard/command-center');
}
