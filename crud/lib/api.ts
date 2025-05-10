const API_URL = 'http://localhost:3000/tasks';

export type Task = {
  id: number;
  descricao: string;
  quantidade: number;
};

export const getTasks = async (): Promise<Task[]> => {
  const res = await fetch(API_URL);
  return res.json();
};

export const getTask = async (id: number): Promise<Task> => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
};

export const createTask = async (task: { descricao: string; quantidade: number }) => {
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
};

export const updateTask = async (id: number, updatedTask: { descricao: string; quantidade: number }) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedTask),
  });

  if (!res.ok) {
    throw new Error('Erro ao atualizar a tarefa');
  }
};

export const deleteTask = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, { 
    method: 'DELETE' });
  if (!res.ok) throw new Error('Erro na resposta da API');
};
