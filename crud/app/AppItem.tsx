import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AppItemProps {
  id: number;
  descricao: string;
  quantidade: number;
  onDelete: () => void;
}

export default function AppItem({ descricao, quantidade, onDelete }: AppItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.text}>🛒 {descricao}</Text>
        <Text style={styles.text}>📦 Quantidade: {quantidade}</Text>
      </View>

      <TouchableOpacity onPress={onDelete} style={[styles.button, styles.deleteButton]}>
        <Ionicons name="trash" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginVertical: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    padding: 8,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: "#D93600",
  },
});
