import AddProductForm from '@/components/products/createProduct';
import ProductCard from '@/components/products/productCard';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
    <div className='mb-2'>
        <AddProductForm />
    </div>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
