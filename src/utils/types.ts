export interface ITask {
  id: number;
  name: string;
  description?: string;
  completed: boolean;
}

export interface TaskRequestParams {
  name: string;
  description?: string;
  completed?: boolean;
}

export interface AuthRequestParams {
  email: string;
  password: string;
}
