import { ITask } from '../../utils/types.ts';
import { RiDeleteBin6Line } from 'react-icons/ri';
import DeleteAlert from '../DeleteAlert';
import { useState } from 'react';
import { deleteTask, fetchTasks } from '../../api/tasks';
import { getActions } from '../../store/app-store';

const TaskItem = ({ task }: { task: ITask }) => {
  const [deleteItem, setDeleteItem] = useState<ITask | null>(null);
  const { setTasks } = getActions();
  const handleDeleteTask = (task: ITask) => {
    deleteTask(task.id).then((res) => {
      if (res.status === 203) {
        fetchTasks().then((res) => {
          setTasks(res.data);
        });
      }
    });
  };

  return (
    <li className="relative py-5 hover:bg-gray-50 dark:hover:bg-slate-800">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl justify-between gap-x-6">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-slate-900 dark:text-slate-300">
                <span className="inset-x-0 -top-px bottom-0" />
                {task.name}
              </p>
              {!!task.description && (
                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                  {task.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-4">
            <div className="sm:flex sm:flex-col sm:items-end">
              <button className={'z-20'} onClick={() => setDeleteItem(task)}>
                <RiDeleteBin6Line className={'text-red-500'} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {deleteItem && (
        <DeleteAlert
          show={!!deleteTask}
          onClose={() => setDeleteItem(null)}
          onConfirmAction={() => handleDeleteTask(deleteItem)}
          title={'Are you sure you want to delete this?'}
          description={
            'You will not be able to recover the item after deletion!'
          }
        />
      )}
    </li>
  );
};

export default TaskItem;
