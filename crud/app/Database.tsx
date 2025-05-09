import AsyncStorage from '@react-native-async-storage/async-storage';

interface ListItem {
  id: number;
  descricao: string;
  quantidade: number;
}

async function saveItem(listItem: ListItem, id?: number) {
  const savedItems = await getItems();

  if (id) {
    const index = savedItems.findIndex(item => item.id === id);
    if (index !== -1) {
      savedItems[index] = { ...savedItems[index], ...listItem };
    }
  } else {
    listItem.id = new Date().getTime();
    savedItems.push(listItem);
  }

  await AsyncStorage.setItem('items', JSON.stringify(savedItems));
}

async function getItems(): Promise<ListItem[]> {
  try {
    const items = await AsyncStorage.getItem('items');
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error("Erro ao recuperar os itens:", error);
    return [];
  }
}

async function getItem(id: number): Promise<ListItem | undefined> {
  const items = await getItems();
  return items.find(item => item.id === id);
}

async function deleteItem(id: number) {
  const items = await getItems();
  const filteredItems = items.filter(item => item.id !== id);
  await AsyncStorage.setItem('items', JSON.stringify(filteredItems));
}

export default { saveItem, getItems, getItem, deleteItem };