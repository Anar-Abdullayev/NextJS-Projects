'use client'
import { useEffect, useState } from 'react'

export default function StudentTestPage() {
  const [students, setStudents] = useState([])
  const [form, setForm] = useState({ name: '', age: '', id: null })
  const [message, setMessage] = useState('')
    console.log(students);
  const fetchStudents = async () => {
    const res = await fetch('/api/students')
    const data = await res.json()
    setStudents(data)
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.name || !form.age) {
      setMessage('Name and age required')
      return
    }

    const payload = {
      name: form.name,
      age: Number(form.age),
    }

    let res
    if (form.id === null) {
      res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } else {
      res = await fetch(`/api/students/${form.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    }

    if (res.ok) {
      setMessage('Success!')
      setForm({ name: '', age: '', id: null })
      fetchStudents()
    } else {
      setMessage('Something went wrong')
    }
  }

  const handleDelete = async (id) => {
    const res = await fetch(`/api/students/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setMessage('Deleted!')
      fetchStudents()
    } else {
      setMessage('Delete failed')
    }
  }

  const handleEdit = (student) => {
    setForm({ name: student.name, age: student.age, id: student.id })
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Student Manager</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          style={{ marginRight: 10 }}
        />
        <input
          name="age"
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          style={{ marginRight: 10, width: 80 }}
        />
        <button type="submit">{form.id === null ? 'Add' : 'Update'}</button>
        {form.id !== null && (
          <button
            type="button"
            onClick={() => setForm({ name: '', age: '', id: null })}
            style={{ marginLeft: 10 }}
          >
            Cancel
          </button>
        )}
      </form>

      <div>{message && <p>{message}</p>}</div>

      <ul>
        {students.map((s) => (
          <li key={s.id} style={{ marginBottom: 10 }}>
            <b>{s.name}</b> (Age {s.age}){' '}
            <button onClick={() => handleEdit(s)} style={{ marginLeft: 10 }}>
              Edit
            </button>
            <button
              onClick={() => handleDelete(s.id)}
              style={{ marginLeft: 5 }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}