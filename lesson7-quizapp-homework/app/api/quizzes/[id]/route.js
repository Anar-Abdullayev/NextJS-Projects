import prisma from "@/lib/prisma";

export async function GET(request , { params}) {
    const { id }  = await params;
    console.log('Fetching quiz with ID:', id);
    if (!id) {
        return new Response(JSON.stringify({ error: 'Quiz ID is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const quiz = await prisma.quiz.findUnique({
        where: { id: parseInt(id) },
        include: {
            questions: {
                include: {
                    options: true
                }
            }
        }
    });

    if (!quiz) {
        return new Response(JSON.stringify({ error: 'Quiz not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return new Response(JSON.stringify(quiz), {
        headers: { 'Content-Type': 'application/json' }
    });
}


export async function PUT(request, { params }) {
  const { id } = await params;
  const urlQuizId = Number(id); 
  const body      = await request.json();

  await prisma.quiz.update({
    where: { id: urlQuizId },
    data:  { title: body.title }
  });

  const sentQuestionIds = [];
  const sentOptionIds   = [];

  for (const q of body.questions) {
    let questionId;

    if (q.id) {
      await prisma.question.update({
        where: { id: q.id },
        data:  { text: q.text }
      });
      questionId = q.id;
    } else {
      const created = await prisma.question.create({
        data: {
          text:   q.text,
          quizId: urlQuizId
        }
      });
      questionId = created.id;
    }

    sentQuestionIds.push(questionId);

    for (const opt of q.options) {
      if (opt.id) {
        await prisma.option.update({
          where: { id: opt.id },
          data:  {
            text:      opt.text,
            isCorrect: opt.isCorrect
          }
        });
        sentOptionIds.push(opt.id);
      } else {
        const created = await prisma.option.create({
          data: {
            text:       opt.text,
            isCorrect:  opt.isCorrect,
            questionId: questionId
          }
        });
        sentOptionIds.push(created.id);
      }
    }
  }

  await prisma.option.deleteMany({
    where: {
      question: { quizId: urlQuizId },
      id:       { notIn: sentOptionIds }
    }
  });

  await prisma.question.deleteMany({
    where: {
      quizId: urlQuizId,
      id:     { notIn: sentQuestionIds }
    }
  });

  const fullQuiz = await prisma.quiz.findUnique({
    where:   { id: urlQuizId },
    include: { questions: { include: { options: true } } }
  });

  return Response.json(fullQuiz);
}