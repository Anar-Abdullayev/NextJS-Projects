import { students, findIndexById } from '../../../../public/students.js';


export async function GET(_, { params: { id } }) {
  const student = students.find((s) => s.id === Number(id));
  return student ? Response.json(student) : new Response('Not found', { status: 404 });
}

export async function PUT(request, { params: { id } }) {
  const idx = findIndexById(Number(id));
  if (idx === -1) return notFound();

  const { name, age } = await request.json();
  if (!name || typeof age !== 'number')
    return new Response('Bad Request', { status: 400 });

  students[idx] = { id: Number(id), name, age };
  return Response.json(students[idx]);
}

export async function DELETE(_, { params: { id } }) {
  const idx = findIndexById(Number(id));
  if (idx === -1) return new Response('Not found', { status: 404 });

  students.splice(idx, 1);
  return new Response(null, { status: 204 });
}