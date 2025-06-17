'use client';
import { useParams } from "next/navigation";

export default function TodoItemDetails() {
    const { id } = useParams();

    const todoList = JSON.parse(localStorage.getItem("mytodolist") || "[]");

    const todoItem = todoList.find((item) => item.id == id);
    if (!todoItem) {
        return <p>Todo item not found</p>;
    }

    return (
        <div>
            <p>TodoItem Title: {todoItem.title}</p>
            <p>TodoItem Description: {todoItem.description}</p>
            <p>TodoItem Completed: {todoItem.completed ? "Yes" : "No"}</p>
            <button onClick={() => window.history.back()}>Back to Todo List</button>
        </div>
    )
}