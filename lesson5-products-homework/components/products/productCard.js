"use client";
import prisma from "@/lib/prisma";
import Link from "next/link";
export default function ProductCard({ product, isForShowcase = false }) {
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const res = await fetch(`/api/products/${product.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Product deleted successfully.");
      window.location.reload();
    } else {
      const { error } = await res.json();
      alert(error || "Something went wrong while deleting the product.");
    }
  };
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white">
      <h2 className="text-xl font-bold mb-2">{product.name}</h2>
      <p className="text-gray-700 text-sm mb-2">{product.desc}</p>
      <div className="text-blue-600 font-semibold">
        ${product.price.toFixed(2)}
      </div>
      <div className="text-xs text-gray-400 mt-1">
        {new Date(product.createdAt).toISOString().slice(0, 10)}
      </div>
      {!isForShowcase && (
        <div className="flex justify-end gap-2">
          <Link
            href={`/products/${product.id}`}
            className="bg-yellow-500 hover:bg-yellow-700 px-4 py-2 cursor-pointer hover:text-white rounded"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 px-4 py-2 cursor-pointer hover:text-white rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
