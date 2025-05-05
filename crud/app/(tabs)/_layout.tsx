import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#32264d',
      tabBarInactiveTintColor: '#c1bccc',
      tabBarActiveBackgroundColor: '#ebebf5',
      tabBarInactiveBackgroundColor: '#fafafc',
      tabBarLabelStyle: {
        fontSize: 13,
        position: 'absolute',
        top: 15,
        bottom: 0,
        left: 0,
        right: 0
      },
      tabBarIconStyle: { display: "none" }
    }}>
      <Tabs.Screen name="list" options={{ tabBarLabel: "Compras" }} />
      <Tabs.Screen name="form" options={{ tabBarLabel: "Adicionar" }} />
    </Tabs>
  );
}
