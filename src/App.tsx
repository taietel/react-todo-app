import './index.css';
import TasksList from './components/TasksList';
import TaskForm from './components/TaskForm';
import { getActions, useTasks, useUser } from './store/app-store';
import LoginForm from './components/LoginForm';
import { useEffect } from 'react';
import { fetchTasks } from './api/tasks.ts';

function App() {
  const { setTasks, clearData, getAccessToken } = getActions();
  const token = getAccessToken();
  const user = useUser();

  useEffect(() => {
    if (!token) return;
    fetchTasks().then((res) => {
      setTasks(res.data);
    });
  }, [user]);

  const tasks = useTasks();

  const handleLogout = () => {
    setTasks(undefined);
    clearData();
  };

  return (
    <div className={'max-w-2xl mx-auto'}>
      <div className="mx-auto max-w-7xl mt-12">
        <div className="py-4 mx-auto max-w-2xl w-full bg-slate-800 dark:bg-slate-700 dark:text-slate-700 md:rounded">
          <h1 className="text-2xl text-white text-center">Simple TODOs</h1>
          {token && (
            <a
              role={'button'}
              onClick={handleLogout}
              className="text-center block mt-2 text-red-500"
            >
              logout
            </a>
          )}
        </div>
      </div>
      {!token ? (
        <LoginForm />
      ) : (
        <>
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl md:border md:rounded dark:border-slate-700">
              {tasks && tasks.length > 0 ? (
                <TasksList tasks={tasks} />
              ) : (
                <div className="p-4 text-center">
                  <p className="text-xl text-gray-500 dark:text-slate-300">
                    No tasks found
                  </p>
                </div>
              )}
            </div>
            <div className={'mt-6'}>
              <TaskForm />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
