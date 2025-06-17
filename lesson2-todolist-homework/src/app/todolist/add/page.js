'use client'

import { useState } from "react";

export default function AddTodo() {
    const [taskInput, setTaskInput] = useState({ title: '', description: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskInput((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let todoList = JSON.parse(localStorage.getItem("mytodolist") || "[]");
        let lastId = todoList.length > 0 ? todoList[todoList.length - 1].id : 0;
        taskInput.id = lastId + 1;
        taskInput.completed = false;
        todoList.push(taskInput);
        localStorage.setItem("mytodolist", JSON.stringify(todoList));
        console.log("Todo added:", taskInput);
        window.history.back();
    }

    return (
        <div>
            <h1>Add Todo</h1>
            <form onSubmit={handleSubmit}>
                <input value={taskInput.title} onChange={handleInputChange} name="title" type="text" placeholder="Title" required />
                <textarea value={taskInput.description} onChange={handleInputChange} name="description" placeholder="Description" required></textarea>
                <button type="submit">Add Todo</button>
                <button type='button' onClick={() => window.history.back()}>Cancel</button>
            </form>
        </div>
    )
}