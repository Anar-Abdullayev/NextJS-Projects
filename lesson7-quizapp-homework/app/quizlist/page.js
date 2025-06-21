'use client'

import Link from "next/link";
import { useEffect, useState } from "react"

export default function QuizList() {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        async function fetchQuizzes() {
            const res = await fetch('/api/quizzes');
            if (!res.ok) {
                console.error('Failed to fetch quizzes');
                return;
            }
            const data = await res.json();
            console.log('Fetched quizzes:', data);
            setQuizzes(data);
        }
        fetchQuizzes();
    }, [])

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Quiz List</h1>

            <Link className="text-blue-600 underline" href={'/create'}>Create new quiz</Link>
            <ul className="mt-4 space-y-2">
                {quizzes.map((q) => (
                    <li key={q.id}>
                        <Link href={`/quizlist/${q.id}`} className="block bg-white shadow p-4 rounded hover:bg-gray-100">
                            <div className="flex justify-between">
                                {q.title}
                                <div>
                                    <button className="hover:bg-yellow-400 px-4 rounded-md" onClick={() => window.location = `/quizlist/edit/${q.id}`}>Edit</button>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}