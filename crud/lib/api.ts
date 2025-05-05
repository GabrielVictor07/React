import AsyncStorage from '@react-native-async-storage/async-storage';

export type Task = {
  id: number;
  title: string;
};

// Buscar todas as tarefas
export const getTasks = async (): Promise<Task[]> => {
  const stored = await AsyncStorage.getItem('tasks');
  return stored ? JSON.parse(stored) : [];
};

// Buscar uma tarefa pelo ID
export const getTask = async (id: string): Promise<Task | undefined> => {
  const tasks = await getTasks();
  return tasks.find(t => t.id.toString() === id);
};

// Criar uma nova tarefa
export const createTask = async (task: { title: string }): Promise<void> => {
  const tasks = await getTasks();
  const newTask = { id: Date.now(), ...task };
  const updated = [...tasks, newTask];
  await AsyncStorage.setItem('tasks', JSON.stringify(updated));
};

// Atualizar uma tarefa existente
export const updateTask = async (id: string, updatedTask: { title: string }): Promise<void> => {
  const tasks = await getTasks();
  const updated = tasks.map(t => t.id.toString() === id ? { ...t, ...updatedTask } : t);
  await AsyncStorage.setItem('tasks', JSON.stringify(updated));
};

// Deletar uma tarefa
export const deleteTask = async (id: string): Promise<void> => {
  const tasks = await getTasks();
  const filtered = tasks.filter(t => t.id.toString() !== id);
  await AsyncStorage.setItem('tasks', JSON.stringify(filtered));
};
