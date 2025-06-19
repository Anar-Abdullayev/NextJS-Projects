import prisma from "@/lib/prisma"


export async function GET() {
    const products = await prisma.product.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
    return Response.json(products);
}

export async function POST(request) {
  try {
    const { name, price, desc } = await request.json();

    if (!name || price === undefined || !desc) {
      return Response.json(
        { error: 'name, price and desc are required' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: { name, price: Number(price), desc },
    });

    return Response.json(product, { status: 201 });

  } catch (err) {
    console.error('[POST /api/products] ', err);
    return Response.json(
      { error: 'Could not create product' },
      { status: 500 }
    );
  }
}