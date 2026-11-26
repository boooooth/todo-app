import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const TaskContext = createContext();

const DEFAULT_CATEGORIES = ["Personal", "Work", "School"];

export function TaskProvider({ children }) {
  // Global, persistent state
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [categories, setCategories] = useLocalStorage("categories", DEFAULT_CATEGORIES);

  // ---- Task actions ----
  const addTask = (task) => {
    const newTask = {
      id: crypto.randomUUID(),
      title: task.title,
      description: task.description || "",
      priority: task.priority || "medium",   // "low" | "medium" | "high"
      category: task.category || categories[0],
      dueDate: task.dueDate || "",
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (id, updates) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTask = (id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const getTask = (id) => tasks.find((t) => t.id === id);

  // ---- Category actions ----
  const addCategory = (name) => {
    const clean = name.trim();
    if (clean && !categories.includes(clean)) {
      setCategories((prev) => [...prev, clean]);
    }
  };

  const deleteCategory = (name) => {
    setCategories((prev) => prev.filter((c) => c !== name));
  };

  const value = {
    tasks, categories,
    addTask, updateTask, deleteTask, toggleTask, getTask,
    addCategory, deleteCategory,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

// Shortcut hook so pages can call: const { tasks } = useTasks();
// eslint-disable-next-line react-refresh/only-export-components
export function useTasks() {
  return useContext(TaskContext);
}