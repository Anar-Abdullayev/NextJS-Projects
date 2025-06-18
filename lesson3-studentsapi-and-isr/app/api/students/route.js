import { students, nextId } from '../../../public/students.js';

export async function GET() {
  return Response.json(students);
}

export async function POST(request) {
  const { name, age } = await request.json();

  if (!name || typeof age !== 'number')
    return new Response('Bad Request', { status: 400 });

  const newStudent = { id: nextId(), name, age };
  students.push(newStudent);

  return Response.json(newStudent, { status: 201 });
}

