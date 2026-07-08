import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">HaaBeet</h1>
      <p className="mt-4 text-slate-600">
        A gamified habit tracker — coming soon.
      </p>
      <nav className="mt-6 flex gap-4">
        <Link href="/login" className="text-blue-600 underline">
          Log in
        </Link>
        <Link href="/signup" className="text-blue-600 underline">
          Sign up
        </Link>
      </nav>
    </main>
  );
}
