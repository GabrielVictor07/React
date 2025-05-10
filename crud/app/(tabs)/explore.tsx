import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { createTask, updateTask } from "../../lib/api";
import { Feather } from "@expo/vector-icons";

export default function AppForm() {
  const router = useRouter();
  const { id, descricao: routeDescricao, quantidade: routeQuantidade } = useLocalSearchParams();

  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState("");

  useEffect(() => {
    if (routeDescricao) setDescricao(String(routeDescricao));
    if (routeQuantidade) setQuantidade(String(routeQuantidade));
  }, [routeDescricao, routeQuantidade]);

  const handleSave = async () => {
    if (!descricao.trim() || !quantidade.trim()) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    const task = {
      descricao: descricao.trim(),
      quantidade: parseInt(quantidade),
    };

    try {
      // Verifica se o id está presente, se sim, realiza o update, se não, cria uma nova tarefa
      if (id && !isNaN(Number(id))) {
        await updateTask(Number(id), task);  // Atualiza a tarefa existente
        Alert.alert("Sucesso", "Tarefa atualizada com sucesso!");
      } else {
        await createTask(task);  // Cria uma nova tarefa
        Alert.alert("Sucesso", "Tarefa criada com sucesso!");
      }

      router.push("/");  // Redireciona para a lista de tarefas
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível salvar.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="O que está faltando em casa?"
        value={descricao}
        onChangeText={setDescricao}
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Digite a quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <View style={styles.buttonContent}>
          <Feather name="save" size={20} color="#fff" />
          <Text style={styles.buttonText}>{id ? "Atualizar" : "Salvar"}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
    paddingTop: 50,
  },
  input: {
    backgroundColor: "#1a1a1a",
    color: "#fff",
    fontSize: 16,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 8,
  },
});
