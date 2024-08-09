import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import useTasksStore from '../../hooks/useTasksStore';

const TaskForm = () => {
  const { createTask } = useTasksStore();
  const formSchema = z.object({
    name: z.string().min(1, { message: 'Task name is required' }),
    description: z.string(),
  });

  const initialValues = {
    name: '',
    description: '',
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const submitTask = (values: any) => {
    createTask(values);
    form.reset();
  };

  return (
    <div className={'w-full'}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitTask)}>
          <FormField
            control={form.control}
            name={'name'}
            render={({ field }) => (
              <FormItem className={''}>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={'description'}
            render={({ field }) => (
              <FormItem className={''}>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className={'w-full'}>
            <Button type="submit" className={'mt-3'}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TaskForm;
