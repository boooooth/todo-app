import { useState } from "react";
import { useTasks } from "../context/TaskContext";

export default function Categories() {
  const { tasks, categories, addCategory, deleteCategory } = useTasks();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const countFor = (category) => tasks.filter((t) => t.category === category).length;

  const handleAdd = (e) => {
    e.preventDefault();
    const clean = name.trim();
    if (!clean) {
      setError("Please enter a category name");
      return;
    }
    if (categories.some((c) => c.toLowerCase() === clean.toLowerCase())) {
      setError("That category already exists");
      return;
    }
    addCategory(clean);
    setName("");
    setError("");
  };

  const handleDelete = (category) => {
    if (window.confirm(`Delete category "${category}"?`)) {
      deleteCategory(category);
    }
  };

  return (
    <section>
      <h1>Categories</h1>

      <form className="inline-form" onSubmit={handleAdd}>
        <input
          value={name}
          onChange={(e) => { setName(e.target.value); setError(""); }}
          placeholder="New category name"
        />
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
      {error && <p className="error">{error}</p>}

      <ul className="category-list">
        {categories.map((category) => {
          const count = countFor(category);
          const locked = count > 0 || categories.length === 1;
          return (
            <li key={category} className="category-item">
              <div>
                <strong>{category}</strong>
                <div className="due">{count} task{count !== 1 ? "s" : ""}</div>
              </div>
              <button
                className="btn btn-small btn-danger"
                onClick={() => handleDelete(category)}
                disabled={locked}
                title={
                  count > 0
                    ? "Move or delete the tasks in this category first"
                    : categories.length === 1
                    ? "You need at least one category"
                    : "Delete category"
                }
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}