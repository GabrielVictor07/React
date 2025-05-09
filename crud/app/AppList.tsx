import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import AppItem from "./AppItem";

type Item = {
  id: number;
  descricao: string;
  quantidade: number;
};

export default function AppList() {
  const [items, setItems] = useState<Item[]>([]);

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
        throw new Error('Erro na resposta da API');
      }
  
      console.log('Item excluído com sucesso');
  
      // Atualiza a lista após exclusão
      await loadItems();
  
    } catch (error) {
      console.error('Erro ao excluir item:', error);
      alert('Erro ao excluir item');
    }
  };

  // Atualiza os dados sempre que a tela ganhar foco
  useFocusEffect(
    useCallback(() => {
      loadItems();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Compras</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {items.map((item) => (
          <AppItem
            key={item.id}
            id={item.id}
            descricao={item.descricao}
            quantidade={item.quantidade}
            onDelete={() => handleDeleteItem(item.id)}
          />
        ))}
      </ScrollView>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D93600",
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#fff",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});
