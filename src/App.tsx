import './index.css';
import { useEffect } from 'react';
import TasksList from './components/TasksList';
import TaskForm from './components/TaskForm';
import DeleteAlert from './components/DeleteAlert';
import useTasksStore from './hooks/useTasksStore';

function App() {
  const { fetchTasks, tasks, deleteTask, taskToDelete, setTaskToDelete } =
    useTasksStore();

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className={'max-w-2xl mx-auto'}>
      <div className="mx-auto max-w-7xl mt-12">
        <div className="py-4 mx-auto max-w-2xl w-full bg-slate-800 dark:bg-slate-700 dark:text-slate-700 md:rounded">
          <h1 className="text-2xl text-white text-center">Simple TODOs</h1>
        </div>
      </div>
      <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl md:border md:rounded dark:border-slate-700">
          <TasksList tasks={tasks} />
        </div>
        <div className={'mt-6'}>
          <TaskForm />
        </div>
      </div>
      <DeleteAlert
        show={!!taskToDelete}
        onClose={() => setTaskToDelete(null)}
        onConfirmAction={() => deleteTask(taskToDelete?.id)}
        title={'Are you sure you want to delete this?'}
        description={'You will not be able to recover the item after deletion!'}
      />
    </div>
  );
}

export default App;
