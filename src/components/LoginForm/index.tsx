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
import { Button } from '../ui/button';
import { login } from '../../api/auth';
import { AuthRequestParams } from '../../utils/types.ts';

const LoginForm = () => {
  const formSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(1, { message: 'Password is required' }),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const handleLogin = async (values: AuthRequestParams) => {
    login(values)
      .then((res) => {})

      .catch((res) => {
        form.setError('email', { message: res.response.data.message });
      });
  };

  return (
    <div className={'w-1/2 justify-center mx-auto mt-12'}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)}>
          <FormField
            control={form.control}
            name={'email'}
            render={({ field }) => (
              <FormItem className={''}>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={'password'}
            render={({ field }) => (
              <FormItem className={''}>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type={'password'} />
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

export default LoginForm;
