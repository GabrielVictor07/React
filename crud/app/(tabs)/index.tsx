import React, { useState, useCallback } from "react";
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AppItem from "../AppItem";

type Item = {
  id: number;
  descricao: string;
  quantidade: number;
};

export default function AppList() {
  const [items, setItems] = useState<Item[]>([]);
  const [editItem, setEditItem] = useState<Item | null>(null);  // Estado para controle de edição
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const loadItems = async () => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/`);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Erro ao carregar itens:", error);
    }
  };

  const handleDeleteItem = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir item');
      }

      console.log('Item excluído com sucesso');
      await loadItems();
    } catch (error) {
      console.error('Erro ao excluir item:', error);
      alert('Erro ao excluir item');
    }
  };

  const handleEditItem = (item: Item) => {
    setEditItem(item);
    setDescricao(item.descricao);
    setQuantidade(String(item.quantidade));
  };

  const handleUpdateItem = async () => {
    if (!descricao.trim() || !quantidade.trim()) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    const task = {
      descricao: descricao.trim(),
      quantidade: parseInt(quantidade),
    };

    try {
      if (editItem) {
        await fetch(`http://localhost:3000/tasks/${editItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(task),
        });
        setEditItem(null);  // Limpar o estado de edição após a atualização
        loadItems();  // Recarregar os itens
      }
    } catch (err) {
      Alert.alert("Erro", "Não foi possível atualizar a tarefa.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadItems();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Compras</Text>

      {editItem ? (
        <View style={styles.editForm}>
          <Text style={styles.title}>Editar Tarefa</Text>
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={descricao}
            onChangeText={setDescricao}
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={styles.input}
            placeholder="Quantidade"
            value={quantidade}
            onChangeText={setQuantidade}
            keyboardType="numeric"
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity style={styles.button} onPress={handleUpdateItem}>
            <Text style={styles.buttonText}>Atualizar</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {items.map((item) => (
          <AppItem
            key={item.id}
            id={item.id}
            descricao={item.descricao}
            quantidade={item.quantidade}
            onDelete={() => handleDeleteItem(item.id)}
            onEdit={() => handleEditItem(item)}  // Agora editamos na mesma página
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#fff",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  editForm: {
    backgroundColor: "#191919",
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#068003",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
