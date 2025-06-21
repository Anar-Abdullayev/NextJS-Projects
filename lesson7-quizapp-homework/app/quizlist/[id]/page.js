"use client";

import CorrectIcon from "@/components/icons/correct";
import IncorrectIcon from "@/components/icons/incorrect";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function QuizDetail() {
  const { id } = useParams();

  const [quiz, setQuiz] = useState({ title: "", questions: [] });
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function fetchQuiz() {
      const res = await fetch(`/api/quizzes/${id}`);
      if (!res.ok) {
        console.log("Failed to fetch quiz");
        return;
      }
      const data = await res.json();
      return data;
    }
    fetchQuiz().then((data) => {
      console.log("Quiz data:", data);
      setQuiz(data);
    });
  }, [id]);

  function handleAnswerChange(qIdx, aIdx) {
    const copy = [...answers];
    copy[qIdx] = aIdx;
    setAnswers(copy);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let correct = 0;
    answers.forEach((ans, i) => {
      console.log(
        `Question ${i + 1}:`,
        quiz.questions[i].text,
        "Selected answer:",
        ans,
        "IsCorrect answer:",
        quiz.questions[i].options[ans]
      );
      quiz.questions[i].options[ans]?.isCorrect && correct++;
    });
    setScore(correct);
    setShowResult(true);
  }

  if (!quiz) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
      {quiz.questions.map((q, i) => (
        <div key={q.id} className="mb-4">
          <p className="font-semibold">{q.text}</p>
          {q.options.map((opt, j) => (
            <div className="flex items-center" key={opt.id}>
              <input
                type="radio"
                name={`q-${q.id}`}
                checked={answers[i] === j}
                onChange={() => handleAnswerChange(i, j)}
                className="mr-2"
              />
              <label>{opt.text}</label>
              {showResult ? (
                opt.isCorrect ? (
                  <CorrectIcon className="ml-2 text-green-500" />
                ) : answers[i] === j ? (
                  <IncorrectIcon className="ml-2 text-red-500" />
                ) : null
              ) : null}
            </div>
          ))}
        </div>
      ))}

      {!showResult ? (
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded mt-4"
        >
          Finish quiz
        </button>
      ) : (
        <p className="text-xl font-bold text-blue-700 mt-4">
          Result: {score} / {quiz.questions.length}
          <Link href="/quizlist" className="text-blue-500 underline ml-2">
            Back to quizzes
          </Link>
        </p>
      )}
    </div>
  );
}
