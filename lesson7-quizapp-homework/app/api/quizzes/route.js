import prisma from "@/lib/prisma";

export async function GET() {
    const quizzes = await prisma.quiz.findMany({
        include: {
            questions: {
                include: {
                    options: true
                }
            }
        }
    });

    return new Response(JSON.stringify(quizzes), {
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function POST(req, { params }){
    const body = await req.json();
    const { title, questions } = body;

    const quiz = await prisma.quiz.create({
        data: {
            title,
            questions: {
                create: questions.map(q => ({
                    text: q.question,
                    options: {
                        create: q.options.map((opt, optIdx) => ({
                            text: opt,
                            isCorrect: optIdx === q.answer
                        }))
                    }
                }))
            }
        }
    });

    return new Response(JSON.stringify(quiz), {
        headers: { 'Content-Type': 'application/json' }
    });
}