import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { formatDate, isOverdue } from "../utils/dateHelpers";

export default function TaskCard({ task }) {
  const { toggleTask, deleteTask } = useTasks();

  const handleDelete = () => {
    if (window.confirm(`Delete "${task.title}"?`)) {
      deleteTask(task.id);
    }
  };

  return (
    <div className={`task-card ${task.completed ? "done" : ""} ${isOverdue(task) ? "overdue" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
      />

      <div className="task-info">
        <Link to={`/tasks/${task.id}`} className="task-title">{task.title}</Link>
        <div className="task-meta">
          <span className={`badge priority-${task.priority}`}>{task.priority}</span>
          <span className="badge">{task.category}</span>
          <span className="due">
            {isOverdue(task) ? "⚠ Overdue · " : ""}{formatDate(task.dueDate)}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <Link to={`/tasks/${task.id}/edit`} className="btn btn-small">Edit</Link>
        <button onClick={handleDelete} className="btn btn-small btn-danger">Delete</button>
      </div>
    </div>
  );
}