import { useState, useEffect } from "react";
import axios from "axios";

const inputStyle = {
  width: "90%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "6px",
  border: "1px solid #ddd"
};

function Dashboard({ token }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/v1/tasks", {
      headers: { Authorization: token }
    });
    setTasks(res.data);
  };

  const createTask = async () => {
    await axios.post(
      "http://localhost:5000/api/v1/tasks",
      { title },
      { headers: { Authorization: token } }
    );
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/v1/tasks/${id}`, {
      headers: { Authorization: token }
    });
    fetchTasks();
  };

  const toggleStatus = async (id) => {
    await axios.put(
      `http://localhost:5000/api/v1/tasks/${id}`,
      { status: "completed" },
      { headers: { Authorization: token } }
    );
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      <button
        onClick={() => window.location.reload()}
        style={{
          background: "#ff9800",
          color: "#fff",
          border: "none",
          padding: "8px",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Logout
      </button>

      <input
        style={inputStyle}
        placeholder="Task title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <button style={btnStyle} onClick={createTask}>
        Add Task
      </button>

      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map(task => (
            <li
              key={task._id}
              style={{
                background: "#f9f9f9",
                margin: "10px 0",
                padding: "12px",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <span
                style={{
                  textDecoration:
                    task.status === "completed" ? "line-through" : "none"
                }}
              >
                {task.title}
              </span>

              <div>
                <button onClick={() => toggleStatus(task._id)}>✔</button>
                <button onClick={() => deleteTask(task._id)}>❌</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const btnStyle = {
  padding: "10px",
  margin: "10px",
  width: "90%",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "#667eea",
  color: "#fff",
  cursor: "pointer"
};

export default Dashboard;