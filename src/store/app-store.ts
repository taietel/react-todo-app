import { createStore, useStore } from 'zustand';
import { useStoreWithEqualityFn } from 'zustand/traditional';
import { ITask } from '../utils/types.ts';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';

interface User {
  id: number;
  email: string;
  name: string;
}

export interface AppStore {
  token: string | undefined;
  user: User | undefined;
  darkMode: boolean;
  tasks: ITask[] | undefined;
  actions: {
    init: () => void;
    setAccessToken: (token: string) => void;
    setUser: (user: User) => void;
    clearData: () => void;
    setTasks: (data: any) => void;
    getAccessToken: () => string | undefined;
  };
}

const appStore = createStore<AppStore>()((set, get) => ({
  token: undefined,
  user: undefined,
  darkMode: true,
  tasks: undefined,
  actions: {
    init: () => {
      const { setAccessToken } = get().actions;
      const storageToken = getCookie(import.meta.env.VITE_ACCESS_TOKEN_KEY);
      setAccessToken(storageToken || '');
    },
    setUser: (user) => {
      set({ user });
    },
    clearData: () => {
      removeCookie(import.meta.env.VITE_ACCESS_TOKEN_KEY);
      set({ user: undefined, token: undefined, tasks: undefined });
    },
    setAccessToken: (token) => {
      setCookie(import.meta.env.VITE_ACCESS_TOKEN_KEY, token);
      set({ token });
    },
    getAccessToken: () => {
      const storageToken = getCookie(import.meta.env.VITE_ACCESS_TOKEN_KEY);
      return get().token || storageToken;
    },
    setTasks: (data) => {
      set({ tasks: data });
    },
  },
}));

export type ExtractState<S> = S extends { getState: () => infer T } ? T : never;

type Params<U> = Parameters<typeof useStore<typeof appStore, U>>;

const accessTokenSelector = (state: ExtractState<typeof appStore>) =>
  state.token;
const userSelector = (state: ExtractState<typeof appStore>) => state.user;
const tasksSelector = (state: ExtractState<typeof appStore>) => state.tasks;
const darkModeSelector = (state: ExtractState<typeof appStore>) =>
  state.darkMode;
const actionsSelector = (state: ExtractState<typeof appStore>) => state.actions;

export const getAccessToken = () => accessTokenSelector(appStore.getState());
export const getUser = () => userSelector(appStore.getState());
export const getTasks = () => tasksSelector(appStore.getState());
export const getDarkMode = () => darkModeSelector(appStore.getState());
export const getActions = () => actionsSelector(appStore.getState());

function useAppStore<U>(selector: Params<U>[1], equalityFn?: Params<U>[2]) {
  return useStoreWithEqualityFn(appStore, selector, equalityFn);
}

export const useAccessToken = () => useAppStore(accessTokenSelector);
export const useUser = () => useAppStore(userSelector);
export const useTasks = () => useAppStore(tasksSelector);
export const useDarkMode = () => useAppStore(darkModeSelector);

export default appStore;
