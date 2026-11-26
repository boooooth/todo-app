import { useState } from "react";
import { useTasks } from "../context/TaskContext";

export default function TaskForm({ initialData = {}, onSubmit, submitLabel = "Save" }) {
  const { categories } = useTasks();

  // Local state for each input
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [priority, setPriority] = useState(initialData.priority || "medium");
  const [category, setCategory] = useState(initialData.category || categories[0] || "");
  const [dueDate, setDueDate] = useState(initialData.dueDate || "");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    onSubmit({ title: title.trim(), description, priority, category, dueDate });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label>
        Title *
        <input
          value={title}
          onChange={(e) => { setTitle(e.target.value); setError(""); }}
          placeholder="e.g. Finish React project"
        />
      </label>
      {error && <p className="error">{error}</p>}

      <label>
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </label>

      <div className="form-row">
        <label>
          Priority
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <label>
          Category
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>

        <label>
          Due date
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </label>
      </div>

      <button type="submit" className="btn btn-primary">{submitLabel}</button>
    </form>
  );
}