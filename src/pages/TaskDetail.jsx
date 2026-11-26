import { useParams, useNavigate, Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { formatDate, isOverdue } from "../utils/dateHelpers";

export default function TaskDetail() {
  const { id } = useParams(); // reads :id from the URL
  const { getTask, toggleTask, deleteTask } = useTasks();
  const navigate = useNavigate();

  const task = getTask(id);

  if (!task) {
    return (
      <section>
        <h1>Task not found</h1>
        <p className="empty">This task doesn't exist or was deleted.</p>
        <Link to="/tasks" className="btn">Back to tasks</Link>
      </section>
    );
  }

  const handleDelete = () => {
    if (window.confirm(Delete "${task.title}"?)) {
      deleteTask(task.id);
      navigate("/tasks");
    }
  };

  const status = task.completed ? "✅ Completed" : isOverdue(task) ? "⚠️ Overdue" : "⏳ Active";

  return (
    <section>
      <Link to="/tasks" className="back-link">← Back to tasks</Link>

      <div className="card">
        <h1>{task.title}</h1>
        <div className="task-meta">
          <span className={badge priority-${task.priority}}>{task.priority}</span>
          <span className="badge">{task.category}</span>
        </div>

        <p>{task.description || <em className="due">No description</em>}</p>

        <dl className="detail-grid">
          <dt>Status</dt>
          <dd>{status}</dd>
          <dt>Due date</dt>
          <dd>{formatDate(task.dueDate)}</dd>
          <dt>Category</dt>
          <dd>{task.category}</dd>
          <dt>Priority</dt>
          <dd style={{ textTransform: "capitalize" }}>{task.priority}</dd>
          <dt>Created</dt>
          <dd>{new Date(task.createdAt).toLocaleString()}</dd>
        </dl>

        <div className="btn-row">
          <button className="btn btn-primary" onClick={() => toggleTask(task.id)}>
            {task.completed ? "Mark as active" : "Mark complete"}
          </button>
          <Link to={/tasks/${task.id}/edit} className="btn">Edit</Link>
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </section>
  );
}