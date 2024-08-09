import { create } from 'zustand';
import { ITask, TaskRequestParams } from '../utils/types.ts';
import { createTask, deleteTask, fetchTasks } from '../api/tasks.ts';

type TasksStore = {
  tasks: ITask[];
  deleteTask: (id: number | undefined) => void;
  fetchTasks: () => void;
  createTask: (data: TaskRequestParams) => void;
  taskToDelete: ITask | null;
  setTaskToDelete: (task: ITask | null) => void;
};

const useTasksStore = create<TasksStore>((set) => ({
  tasks: [],
  taskToDelete: null,
  deleteTask: async (id) => {
    if (!id) {
      return;
    }
    await deleteTask(id);
    set((state: TasksStore) => ({
      tasks: state.tasks.filter((task: ITask) => task.id !== id),
    }));
  },
  fetchTasks: async () => {
    const data = await fetchTasks();
    set({ tasks: data.data });
  },
  createTask: async (data: TaskRequestParams) => {
    const newTask = await createTask(data);
    set((state) => ({
      tasks: [...state.tasks, newTask.data],
    }));
  },
  setTaskToDelete: (task: ITask | null) => {
    set({ taskToDelete: task });
  },
}));

export default useTasksStore;
