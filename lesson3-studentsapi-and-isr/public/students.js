export let students = [
  { id: 1, name: 'Anar Abdullayev',   age: 26 },
  { id: 2, name: 'Huseyn Abdullayev',  age: 30 },
  { id: 3, name: 'Vaqif Abdullayev',  age: 55 },
];

export const findIndexById = (id) => students.findIndex((s) => s.id === id);
export const nextId = () => students.length ? students.length + 1 : 1;