import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { useSettings } from "../context/SettingsContext";
import TaskCard from "../components/TaskCard";
import { isOverdue, todayStr } from "../utils/dateHelpers";

export default function Dashboard() {
  const { tasks } = useTasks();
  const { username } = useSettings();

  // Stats calculated from the tasks
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const active = total - completed;
  const overdueTasks = tasks.filter(isOverdue);
  const dueToday = tasks.filter((t) => !t.completed && t.dueDate === todayStr());
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  // useEffect: set the browser tab title when this page opens
  useEffect(() => {
    document.title = "Dashboard | Todo App";
  }, []);

  return (
    <section>
      <div className="page-header">
        <h1>Dashboard</h1>
        <Link to="/tasks/new" className="btn btn-primary">+ New Task</Link>
      </div>
      <p className="greeting">Hello, {username || "there"} 👋 Here's your overview.</p>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-number">{total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{active}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat-card stat-success">
          <span className="stat-number">{completed}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-card stat-danger">
          <span className="stat-number">{overdueTasks.length}</span>
          <span className="stat-label">Overdue</span>
        </div>
      </div>

      <strong>{percent}% complete</strong>
      <div className="progress">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>

      {total === 0 ? (
        <p className="empty">
          You have no tasks yet. <Link to="/tasks/new">Create your first task</Link>
        </p>
      ) : (
        <>
          {overdueTasks.length > 0 && (
            <div className="dashboard-section">
              <h2>⚠️ Overdue</h2>
              <div className="task-list">
                {overdueTasks.map((task) => <TaskCard key={task.id} task={task} />)}
              </div>
            </div>
          )}

          <div className="dashboard-section">
            <h2>📅 Due today</h2>
            {dueToday.length === 0 ? (
              <p className="empty">Nothing due today 🎉</p>
            ) : (
              <div className="task-list">
                {dueToday.map((task) => <TaskCard key={task.id} task={task} />)}
              </div>
            )}
          </div>

          <Link to="/tasks" className="btn">View all tasks →</Link>
        </>
      )}
    </section>
  );
}