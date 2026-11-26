// Format "2026-11-27" → "Nov 27, 2026"
export function formatDate(dateStr) {
  if (!dateStr) return "No due date";
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

// Today's date in LOCAL time as "YYYY-MM-DD"
export function todayStr() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

// True if the due date is before today and the task isn't completed
export function isOverdue(task) {
  if (!task.dueDate || task.completed) return false;
  return task.dueDate < todayStr();
}