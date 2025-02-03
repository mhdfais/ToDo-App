import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { useState } from "react";

interface Task {
  id: number;
  title: string;
  isCompleted: boolean;
  priority?: "p1" | "p2" | "p3";
}

function App() {
  const [taskName, setTaskName] = useState<string>("");

  const [tasks, setTasks] = useState<Task[]>([]);

  const [editTaskId, setEditTaskId] = useState<number | null>(null);

  const handleSubmit = (): void => {
    if (taskName.trim() === "") return;

    const isDuplicate = tasks.some(
      (task) =>
        task.title.trim().toLowerCase() === taskName.trim().toLowerCase() &&
        task.id !== editTaskId 
    );

    if (isDuplicate) {
      alert("task already exists");
      return;
    }

    if (editTaskId !== null) {
      setTasks(
        tasks.map((task) =>
          task.id === editTaskId ? { ...task, title: taskName } : task
        )
      );
      setEditTaskId(null);
      setTaskName("");
    } else {
      const isDuplicate = tasks.some(
        (task) =>
          task.title.trim().toLowerCase() === taskName.trim().toLowerCase()
      );
      if (isDuplicate) {
        alert("task already exists");
        return;
      }
      setTasks([
        ...tasks,
        { id: new Date().getTime(), title: taskName, isCompleted: false },
      ]);
      setTaskName("");
    }
  };

  const markAsCompleted = (id: number): void => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const deleteTask = (id: number): void => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (task: Task): void => {
    setTaskName(task.title);
    setEditTaskId(task.id);
  };

  return (
    <>
      <div className="container mt-5 w-50 bg bg-secondary p-3 rounded border border-info shadow-lg">
        <h1 className="text-center">Todo List</h1>
        <div className="form-group mb-3">
          <input
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            type="text"
            placeholder="Enter task"
            className="form-control"
          />
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary mt-2" onClick={handleSubmit}>
              {editTaskId ? "Edit" : "Add"}
            </button>
          </div>
        </div>
        <ul className="list-group">
          {tasks.map((task) => (
            <li
              className={`list-group-item d-flex justify-content-between align-items-center ${
                task.isCompleted ? "bg-success text-white" : "bg-light"
              }`}
              key={task.id}
            >
              <span
                style={{
                  textDecoration: task.isCompleted ? "line-through" : "none",
                }}
              >
                {task.title}
              </span>
              <div className="btn-group">
                <button
                  onClick={() => markAsCompleted(task.id)}
                  className={`btn btn-sm ${
                    task.isCompleted ? "btn-warning" : "btn-success"
                  }`}
                >
                  {task.isCompleted ? "undo" : "complete"}
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
                <button
                  onClick={() => editTask(task)}
                  className="btn btn-sm btn-info"
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;

