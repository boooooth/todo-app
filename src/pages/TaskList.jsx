import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import FilterBar from "../components/FilterBar";
import { isOverdue } from "../utils/dateHelpers";

const DEFAULT_FILTERS = {
  search: "",
  status: "all",
  priority: "all",
  category: "all",
  sort: "newest",
};

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

export default function TaskList() {
  const { tasks } = useTasks();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  // 1. Filter
  let visible = tasks.filter((t) => {
    const matchSearch =
      t.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      t.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchStatus =
      filters.status === "all" ||
      (filters.status === "active" && !t.completed) ||
      (filters.status === "completed" && t.completed) ||
      (filters.status === "overdue" && isOverdue(t));
    const matchPriority = filters.priority === "all" || t.priority === filters.priority;
    const matchCategory = filters.category === "all" || t.category === filters.category;
    return matchSearch && matchStatus && matchPriority && matchCategory;
  });

  // 2. Sort
  visible = [...visible].sort((a, b) => {
    if (filters.sort === "dueDate") {
      if (!a.dueDate) return 1;   // tasks without a due date go last
      if (!b.dueDate) return -1;
      return a.dueDate.localeCompare(b.dueDate);
    }
    if (filters.sort === "priority") {
      return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
    }
    return b.createdAt.localeCompare(a.createdAt); // newest
  });

  // useEffect: show the task count in the browser tab title
  useEffect(() => {
    document.title = `Tasks (${visible.length}) | Todo App`;
    return () => { document.title = "Todo App"; }; // reset when leaving the page
  }, [visible.length]);

  const isFiltering = JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS);

  return (
    <section>
      <div className="page-header">
        <h1>All Tasks</h1>
        <Link to="/tasks/new" className="btn btn-primary">+ New Task</Link>
      </div>

      <FilterBar filters={filters} setFilters={setFilters} />

      {isFiltering && (
        <button className="btn btn-small" onClick={() => setFilters(DEFAULT_FILTERS)}>
          Clear filters
        </button>
      )}

      <p className="result-count">
        Showing {visible.length} of {tasks.length} tasks
      </p>

      {tasks.length === 0 ? (
        <p className="empty">No tasks yet. Create your first one!</p>
      ) : visible.length === 0 ? (
        <p className="empty">No tasks match your filters.</p>
      ) : (
        <div className="task-list">
          {visible.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </section>
  );
}