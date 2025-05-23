import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/dashboard');
  // This component will not render anything as redirect happens server-side.
  // You can optionally return null or a loading spinner if preferred,
  // but Next.js handles the redirect before rendering.
  return null;
}
