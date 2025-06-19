'use client';

import { useParams, useRouter } from 'next/navigation';
import useSWR from 'swr';
import { useState, useEffect } from 'react';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: product, error, isLoading } = useSWR(`/api/products/${id}`, fetcher);

  const [form, setForm] = useState({ name: '', price: '', desc: '' });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        price: product.price,
        desc: product.desc,
      });
    }
  }, [product]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert('Product updated');
      router.push('/products');
    } else {
      alert('Failed to update');
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error || product?.error) return <p>Error loading product.</p>;

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full border p-2 rounded"
        />

        <input
          name="price"
          type="number"
          step="0.01"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="w-full border p-2 rounded"
        />

        <textarea
          name="desc"
          value={form.desc}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </main>
  );
}