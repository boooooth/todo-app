import { useTasks } from "../context/TaskContext";

export default function FilterBar({ filters, setFilters }) {
  const { categories } = useTasks();

  // Update one filter while keeping the others
  const update = (field) => (e) =>
    setFilters((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="filter-bar">
      <input
        type="search"
        placeholder="Search tasks..."
        value={filters.search}
        onChange={update("search")}
      />

      <select value={filters.status} onChange={update("status")}>
        <option value="all">All status</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
        <option value="overdue">Overdue</option>
      </select>

      <select value={filters.priority} onChange={update("priority")}>
        <option value="all">All priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      <select value={filters.category} onChange={update("category")}>
        <option value="all">All categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select value={filters.sort} onChange={update("sort")}>
        <option value="newest">Newest first</option>
        <option value="dueDate">Due date</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
}