import TaskItem from '../TaskItem';
import { ITask } from '../../utils/types.ts';

export default function TasksList({ tasks }: { tasks: ITask[] }) {
  return (
    <ul role="list" className="divide-y divide-gray-100 dark:divide-slate-700">
      {tasks && tasks?.map((task) => <TaskItem task={task} key={task.id} />)}
    </ul>
  );
}
