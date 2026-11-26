import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";

export default function TaskList() {
  const { tasks } = useTasks();

  return (
    <section>
      <div className="page-header">
        <h1>All Tasks</h1>
        <Link to="/tasks/new" className="btn btn-primary">+ New Task</Link>
      </div>

      {tasks.length === 0 ? (
        <p className="empty">No tasks yet. Create your first one!</p>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </section>
  );
}