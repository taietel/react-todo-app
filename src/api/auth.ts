import { getActions } from '../store/app-store';
import axiosClient from './axiosClient.ts';
import { AuthRequestParams } from '../utils/types.ts';

export const login = async (authData: AuthRequestParams) => {
  const { setAccessToken, setUser } = getActions();

  const response = await axiosClient.post('/sanctum/token', authData);
  const { token, user } = response.data;

  setAccessToken(token);
  setUser(user);

  return response;
};
