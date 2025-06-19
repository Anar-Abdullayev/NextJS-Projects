import prisma from '@/lib/prisma';

export async function GET(req, { params }) {
  let { id } = await params;
  id = Number(id);
  if (isNaN(id)) return Response.json({ error: 'Invalid ID' }, { status: 400 });

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return Response.json({ error: 'Not found' }, { status: 404 });

  return Response.json(product);
}

export async function PUT(req, { params }) {
  const id = Number(params.id);
  if (isNaN(id)) return Response.json({ error: 'Invalid ID' }, { status: 400 });

  const { name, price, desc } = await req.json();

  try {
    const updated = await prisma.product.update({
      where: { id },
      data: { name, price: Number(price), desc },
    });

    return Response.json(updated);
  } catch (err) {
    return Response.json({ error: 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    if (!id) {
      return Response.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const product = await prisma.product.delete({
      where: { id: Number(id) },
    });

    return Response.json(product, { status: 200 });
  } catch (err) {
    console.error('[DELETE /api/products/:id] ', err);
    return Response.json(
      { error: 'Could not delete product' },
      { status: 500 }
    );
  }
}