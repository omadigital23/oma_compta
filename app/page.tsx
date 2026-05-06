import { redirect } from 'next/navigation';

// The real dashboard is in (dashboard)/page.tsx
// This file should not exist — remove it if it causes redirect loops
export default function Page() {
  redirect('/facturation/factures');
}
