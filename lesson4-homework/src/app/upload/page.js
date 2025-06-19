'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function UploadPage() {
  const router = useRouter();
  const [err, setErr] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await fetch('/api/portfolio', {
      method: 'POST',
      body: formData,
    });
    console.log(formData);
    if (res.ok) {
      router.push('/thankyou');
    } else {
      const { error } = await res.json();
      setErr(error ?? 'Error uploading data');
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-8 bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded-xl bg-white p-6 shadow-xl"
      >
        <h1 className="text-2xl font-semibold text-center">My Data</h1>

        <input
          name="firstName"
          placeholder="Firstname"
          required
          className="w-full rounded border p-2"
        />
        <input
          name="lastName"
          placeholder="Lastname"
          required
          className="w-full rounded border p-2"
        />
        <input
          name="email"
          type="email"
          placeholder="E‑mail"
          required
          className="w-full rounded border p-2"
        />

        <input
          name="file"
          type="file"
          accept=".jpg,.png,.pdf"
          required
          className="w-full rounded border p-2"
        />

        {err && <p className="text-sm text-red-600">{err}</p>}

        <button
          type="submit"
          className="w-full rounded bg-blue-600 p-2 font-medium text-white hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </main>
  );
}