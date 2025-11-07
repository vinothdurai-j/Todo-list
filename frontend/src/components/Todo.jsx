import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://todo-list-backend-2j2j.onrender.com";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  useEffect(() => { fetchTasks(); }, []);

  const addTask = async () => {
    if (!title.trim()) return;
    await axios.post(API, { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTasks();
  };

  const toggleComplete = async (id) => {
    await axios.put(`${API}/${id}`);
    fetchTasks();
  };

  return (
    <div className='bg-white shadow-xl p-6 rounded-xl w-96'>
      <h1 className='text-2xl font-bold text-center mb-4'>To-Do List</h1>
      <div className='flex mb-4'>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='border p-2 flex-1 rounded-l-md'
          placeholder='Enter a new task'
        />
        <button onClick={addTask} className='bg-blue-500 text-white px-4 rounded-r-md'>Add</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className='flex justify-between items-center border-b py-2'>
            <span className={task.completed ? "line-through text-gray-400" : ""}>{task.title}</span>
            <div className='space-x-2'>
              <button onClick={() => toggleComplete(task._id)} className='bg-green-500 text-white px-2 rounded'>✓</button>
              <button onClick={() => deleteTask(task._id)} className='bg-red-500 text-white px-2 rounded'>✕</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
