import React from "react";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import AppList from "./AppList";
import AppForm from "./AppForm";

type RootTabParamList = {
  AppList: undefined;
  AppForm: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const screenOptions = ({
  route,
}: {
  route: RouteProp<RootTabParamList, keyof RootTabParamList>;
}): BottomTabNavigationOptions => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName: keyof typeof Ionicons.glyphMap = "list";

    if (route.name === "AppForm") {
      iconName = focused ? "add-circle" : "add-circle-outline";
    } else if (route.name === "AppList") {
      iconName = focused ? "list" : "list-outline";
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  },
    tabBarActiveTintColor: "#32264d",
    tabBarInactiveTintColor: "#c1bccc",
    tabBarStyle: {
    backgroundColor: "#fafafc",
    paddingBottom: 5,
    height: 60,
  },
    tabBarLabelStyle: {
    fontSize: 12,
    marginBottom: 5,
  },
    headerShown: false,
});

const AppTab: React.FC = () => {
  return (
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="AppList"
          component={AppList}
          options={{
            tabBarLabel: "Compras",
          }}
        />
        <Tab.Screen
          name="AppForm"
          component={AppForm}
          options={{
            tabBarLabel: "Adicionar",
          }}
        />
      </Tab.Navigator>
  );
};

export default AppTab;
