import { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { createTask } from '../../lib/api'; // Certifique-se de que esse caminho está correto

export default function CreateTask() {
  const [title, setTitle] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Erro', 'O título é obrigatório.');
      return;
    }

    try {
      await createTask({ title });
      Alert.alert('Sucesso', 'Tarefa criada com sucesso!');
      router.replace('/'); // Volta para a listagem de tarefas
    } catch (err: any) {
      console.error('Erro ao criar tarefa:', err);
      Alert.alert('Erro', 'Não foi possível criar a tarefa.');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Nova Tarefa</Text>
      <TextInput
        placeholder="Título da tarefa"
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          borderRadius: 8,
          marginBottom: 20,
          color: 'white'
        }}
      />
      <Button title="Criar Tarefa" onPress={handleSubmit} />
    </View>
  );
}
