import { notFound } from 'next/navigation';

export default async function MonitorPage({
  params,
}: PageProps<'/monitors/[id]'>) {
  const { id } = await params;

  // TODO: fetch monitor data from Firestore via lib/firestore.ts
  if (!id) notFound();

  return (
    <main>
      <h1>Monitor: {id}</h1>
      {/* TODO: render monitor detail, uptime chart, incident history */}
    </main>
  );
}
