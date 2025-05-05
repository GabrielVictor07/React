import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getTask, updateTask } from '../../lib/api';

export default function EditTask() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);

  const loadTask = async () => {
    try {
      const res = await getTask(String(id));
      setTitle(res?.title ?? '');
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar a tarefa.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!title.trim()) {
      Alert.alert('Erro', 'O título é obrigatório.');
      return;
    }

    try {
      await updateTask(String(id), { title });
      Alert.alert('Sucesso', 'Tarefa atualizada!');
      router.replace('/');
    } catch {
      Alert.alert('Erro', 'Não foi possível atualizar a tarefa.');
    }
  };

  useEffect(() => {
    loadTask();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Editar Tarefa</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Novo título"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          borderRadius: 8,
          marginBottom: 20,
          color: 'white'
        }}
      />
      <Button title="Salvar Alterações" onPress={handleUpdate} />
    </View>
  );
}
