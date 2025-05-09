import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface AppFormProps {
  route: {
    params?: {
      id?: number;
      descricao?: string;
      quantidade?: number;
    };
  };
}

export default function AppForm({ route }: AppFormProps) {
  const router = useRouter();
  const id = route?.params?.id;

  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState('');

  useEffect(() => {
    if (route?.params) {
      setDescricao(route.params.descricao || '');
      setQuantidade(route.params.quantidade?.toString() || '');
    }
  }, [route]);

  async function handleButtonPress() {
    if (!descricao.trim() || !quantidade.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const listItem = {
      descricao: descricao.trim(),
      quantidade: parseInt(quantidade),
    };

    try {
      const response = await fetch(
        id ? `http://localhost:3000/tasks/${id}` : 'http://localhost:3000/tasks',
        {
          method: id ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(listItem),
        }
      );
      

      if (!response.ok) {
        throw new Error('Erro na requisição');
      }

      const result = await response.json();
      console.log(id ? 'Item editado:' : 'Item salvo:', result);
      router.push('/AppList');
    } catch (error) {
      console.error('Erro ao salvar o item:', error);
      Alert.alert('Erro', 'Não foi possível salvar o item');
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setDescricao}
        placeholder="O que está faltando em casa?"
        clearButtonMode="always"
        value={descricao}
      />
      <TextInput
        style={styles.input}
        onChangeText={setQuantidade}
        placeholder="Digite a quantidade"
        keyboardType="numeric"
        clearButtonMode="always"
        value={quantidade}
      />
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <View style={styles.buttonContainer}>
          <Icon name="save" size={22} color="white" />
          <Text style={styles.buttonText}>{id ? 'Atualizar' : 'Salvar'}</Text>
        </View>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
