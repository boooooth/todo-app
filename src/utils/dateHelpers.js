// Format "2026-11-27" → "Nov 27, 2026"
export function formatDate(dateStr) {
  if (!dateStr) return "No due date";
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

// True if the due date is before today and the task isn't completed
export function isOverdue(task) {
  if (!task.dueDate || task.completed) return false;
  const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
  return task.dueDate < today;
}