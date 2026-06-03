import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const AUTH_COOKIE = 'cortex_dashboard_auth';
const ADMIN_PASSWORD = process.env.DASHBOARD_PASSWORD || 'cortex-admin-2025';

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE)?.value === ADMIN_PASSWORD;
}

export async function requireAuth() {
  const authed = await isAuthenticated();
  if (!authed) {
    redirect('/login');
  }
}

export async function checkPassword(password: string): Promise<boolean> {
  return password === ADMIN_PASSWORD;
}

export async function setAuthCookie(password: string) {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, password, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
}
