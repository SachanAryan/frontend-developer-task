import { useEffect, useState } from "react";
import api from "../utils/api.js";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const loadTasks = async () => {
    try { const res = await api.get("/tasks"); setTasks(res.data); } catch { }
  };
  useEffect(() => { loadTasks(); }, []);

  const addTask = async e => {
    e.preventDefault();
    if (!title) return;
    await api.post("/tasks", { title });
    setTitle(""); loadTasks();
  };
  const deleteTask = async id => { await api.delete(`/tasks/${id}`); loadTasks(); };
  const logout = () => { localStorage.removeItem("token"); window.location.href = "/login"; };

  return (
    <>
      <div className="h-screen bg-[#111] content-center">
        <div className="max-w-md mx-auto p-4 text-white bg-[#222] shadow-md shadow-amber-50 rounded-2xl">
          <div className="flex justify-between mb-4">
            <form onSubmit={addTask} className="flex gap-2">
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New Task" className="border p-2 rounded-lg" />
              <button
                type="submit"
                className="bg-blue-500 text-white px-2 rounded-lg"
                >Add</button>
            </form>
            <button 
            onClick={logout} 
            className="bg-red-500 text-white px-2 rounded-lg"
            >Logout</button>
          </div>
          <ul className="flex flex-col gap-2">
            {tasks.map(t => (
              <li key={t._id} 
              className="flex justify-between border p-2 rounded-lg">
                <span>{t.title}</span>
                <button 
                onClick={() => deleteTask(t._id)} 
                className="bg-red-500 text-white px-2 rounded-lg"
                >Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
