import { useParams, useNavigate, Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";

export default function EditTask() {
  const { id } = useParams();          // reads :id from the URL
  const { getTask, updateTask } = useTasks();
  const navigate = useNavigate();

  const task = getTask(id);

  // If someone opens /tasks/wrong-id/edit
  if (!task) {
    return (
      <section>
        <h1>Task not found</h1>
        <p className="empty">This task doesn't exist or was deleted.</p>
        <Link to="/tasks" className="btn">Back to tasks</Link>
      </section>
    );
  }

  const handleUpdate = (data) => {
    updateTask(id, data);
    navigate(`/tasks/${id}`); // go to the task's detail page
  };

  return (
    <section>
      <h1>Edit Task</h1>
      <TaskForm initialData={task} onSubmit={handleUpdate} submitLabel="Save Changes" />
      <button className="btn" onClick={() => navigate(-1)}>Cancel</button>
    </section>
  );
}