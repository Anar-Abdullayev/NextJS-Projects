import ProductCard from '@/components/products/productCard';
import prisma from '@/lib/prisma';

export const revalidate = 60;

export default async function LatestProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5, 
  });

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Latest Products</h1>

      {products.length === 0 ? (
        <p>No products available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} isForShowcase={true} />
          ))}
        </div>
      )}
    </main>
  );
}