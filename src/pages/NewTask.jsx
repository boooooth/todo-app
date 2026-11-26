import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";

export default function NewTask() {
  const { addTask } = useTasks();
  const navigate = useNavigate();

  const handleCreate = (data) => {
    addTask(data);
    navigate("/tasks"); // go to the task list after saving
  };

  return (
    <section>
      <h1>New Task</h1>
      <TaskForm onSubmit={handleCreate} submitLabel="Add Task" />
    </section>
  );
}