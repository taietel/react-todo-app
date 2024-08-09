import axiosClient from './axiosClient';
import { TaskRequestParams } from '../utils/types.ts';

export const fetchTasks = async () => {
  return await axiosClient.get('/todos');
};

export const createTask = async (data: TaskRequestParams) => {
  return await axiosClient.post('/todos', data);
};

export const deleteTask = async (id: number) => {
  return await axiosClient.delete(`/todos/${id}`);
};
