import fs from 'fs/promises';
import path from 'path';
import Image from 'next/image';

export const runtime = 'nodejs';

async function getEntries() {
  const dataFile = path.join(process.cwd(), 'public', 'data', 'data.txt');
  try {
    const raw = await fs.readFile(dataFile, 'utf8');
    return raw
      .split('\n')
      .filter(Boolean)
      .map((line) => JSON.parse(line))
      .reverse();
  } catch {
    return [];
  }
}

export default async function ProfilePage() {
  const entries = await getEntries();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="mb-8 text-center text-3xl font-bold">Profil</h1>

      {entries.length === 0 && (
        <p className="text-center text-gray-600">Hələ məlumat yoxdur.</p>
      )}

      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {entries.map((e, idx) => (
          <li key={idx} className="overflow-hidden rounded-xl bg-white shadow">
            <Image
              src={`/uploads/${e.fileName}`}
              alt={e.fileName}
              width={400}
              height={300}
              className="h-60 w-full object-cover"
            />
            <div className="p-4 text-sm">
              <p>
                <strong>Ad:</strong> {e.firstName} {e.lastName}
              </p>
              <p>
                <strong>E‑mail:</strong> {e.email}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}