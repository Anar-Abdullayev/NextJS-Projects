"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

let todolistData = [
  {
    id: 1,
    title: "Learn React",
    description: "Learn more",
    completed: false,
  },
  {
    id: 2,
    title: "Learn Next.js",
    description: "Learn more",
    completed: false,
  },
  {
    id: 3,
    title: "Build a Todo List App",
    description: "Learn more",
    completed: false,
  },
];

export default function TodoListPage() {
  
  const [todolist, setTodolist] = useState(todolistData);
  const handleCheckboxChange = (id) => {
    const updatedTodos = todolist.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodolist(updatedTodos);
    localStorage.setItem("mytodolist", JSON.stringify(updatedTodos));
  };

  useEffect(() => {
    let todolists = localStorage.getItem("mytodolist");
    if (todolists) {
      todolistData = JSON.parse(todolists);
      setTodolist(todolistData);
    } else {
      localStorage.setItem("mytodolist", JSON.stringify(todolistData));
    }
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todolist.map((todo) => (
          <li key={todo.id}>
            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
              <Link href={`/todolist/${todo.id}`}><h2
                style={{
                  textDecorationLine: `${
                    todo.completed ? "line-through" : "none"
                  }`,
                }}
              >
                {todo.title}
              </h2></Link>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCheckboxChange(todo.id)}
              />
            </div>
          </li>
        ))}
      </ul>

      <div>
        <button onClick={() => window.location = '/todolist/add'}>Add todo</button>
      </div>
    </div>
  );
}
