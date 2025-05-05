import { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { getTasks, deleteTask } from '../../lib/api';

interface Task {
  id: number;
  title: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  const loadTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar as tarefas.');
    }
  };

  const handleDelete = async (id: number) => {
    Alert.alert('Confirmar exclusão', 'Deseja mesmo excluir esta tarefa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteTask(String(id));
            loadTasks();
          } catch {
            Alert.alert('Erro', 'Erro ao excluir a tarefa.');
          }
        },
      },
    ]);
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Nova Tarefa" onPress={() => router.push('./create')} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 15,
              marginVertical: 8,
              backgroundColor: '#f0f0f0',
              borderRadius: 10,
            }}
          >
            <TouchableOpacity onPress={() => router.push(`./edit/${item.id}`)}>
              <Text style={{ fontSize: 16 }}>{item.title}</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 10 }}>
              <Button title="Excluir" color="red" onPress={() => handleDelete(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}
