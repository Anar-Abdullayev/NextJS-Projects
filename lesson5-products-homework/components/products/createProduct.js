'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProductForm() {
  const [form, setForm] = useState({ name: '', price: '', desc: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        price: parseFloat(form.price),
        desc: form.desc,
      }),
    });

    if (res.ok) {
      setForm({ name: '', price: '', desc: '' });
      router.refresh?.();  
      alert('Product saved ✔');
    } else {
      const { error } = await res.json();
      alert(error || 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
        className="border p-2 w-full rounded"
      />

      <input
        name="price"
        type="number"
        step="0.01"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
        className="border p-2 w-full rounded"
      />

      <textarea
        name="desc"
        placeholder="Description"
        value={form.desc}
        onChange={handleChange}
        required
        className="border p-2 w-full rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white rounded p-2 w-full cursor-pointer"
      >
        {loading ? 'Saving…' : 'Add product'}
      </button>
    </form>
  );
}