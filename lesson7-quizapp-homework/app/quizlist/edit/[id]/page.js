'use client'

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function EditQuiz() {
    const { id } = useParams();  
    const [quiz, setQuiz] = useState({ title: "", questions: [] });
    const router = useRouter();

    useEffect(() => {
        async function fetchQuiz() {
            const res = await fetch(`/api/quizzes/${id}`);
            if (!res.ok) {
                console.error('Failed to fetch quiz');
                return;
            }
            const data = await res.json();
            setQuiz(data);
        }
        fetchQuiz();
    },[])

    function handleAddQuestion() {
        setQuiz(prev => ({
            ...prev,
            questions: [...prev.questions, { text: '', options: [{text:'', isCorrect: false}, {text:'', isCorrect: false}, {text: '', isCorrect: false}] }]
        }));
    }

    const handleChangeTitle = (e) => {
        setQuiz(prev => ({ ...prev, title: e.target.value }));
    }
    function handleChangeQuestionText(qIdx, value) {
        const updatedQuestions = [...quiz.questions];
        updatedQuestions[qIdx].text = value;
        setQuiz(prev => ({ ...prev, questions: updatedQuestions }));
    }

    function handleChangeAnswer(qIdx, oIdx) {
        const updatedQuestions = [...quiz.questions];
        updatedQuestions[qIdx].options.forEach((opt, index) => {
            opt.isCorrect = index === oIdx;
        });
        setQuiz(prev => ({ ...prev, questions: updatedQuestions }));
    }

    function handleOptionChange(qIdx, oIdx, value) {
        const updatedQuestions = [...quiz.questions];
        if (!updatedQuestions[qIdx].options[oIdx]) {
            updatedQuestions[qIdx].options[oIdx] = { text: '' };
        }
        updatedQuestions[qIdx].options[oIdx].text = value;
        setQuiz(prev => ({ ...prev, questions: updatedQuestions }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log('Submitting quiz:', quiz);
        await fetch(`/api/quizzes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quiz)
        });
        router.push('/quizlist');
    }
    console.log('Quiz data:', quiz);
    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <input placeholder="Quiz name"
                value={quiz.title}
                onChange={handleChangeTitle}
                className="border p-2 w-full" />

            {
                quiz.questions.map((q, i) => (
                    <div key={i} className="border p-4 rounded">
                        <input
                            placeholder="Question"
                            value={q.text}
                            onChange={(e) => handleChangeQuestionText(i, e.target.value)}
                            className="border p-2 w-full mb-2" />

                        {
                            q.options.map((opt, j) => (
                                <div key={j} className="flex items-center mb-1">
                                    <input
                                        type="radio"
                                        name={`correct-${i}`}
                                        checked={opt.isCorrect}
                                        onChange={() => handleChangeAnswer(i, j)}
                                        className="mr-2" />
                                    <input
                                        value={opt.text}
                                        onChange={(e) => handleOptionChange(i, j, e.target.value)}
                                        placeholder={`Variant ${j + 1}`}
                                        className="border p-2 w-full" />
                                </div>
                            ))
                        }
                    </div>
                ))
            }

            <button type="button" onClick={handleAddQuestion} className="bg-gray-200 cursor-pointer px-4 py-2 rounded">Add new question</button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 ms-3 cursor-pointer text-white px-4 py-2 rounded">Save Quiz</button>
        </form>
    )
}