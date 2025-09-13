import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { CatsProvider } from "@/contexts/CatsContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <CatsProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#EC537E",
          tabBarInactiveTintColor:
            Colors[colorScheme ?? "light"].tabIconDefault,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle: {
            position: "absolute",
            bottom: 25,
            marginLeft: "25%",
            width: 180,
            height: 50,
            elevation: 0,
            backgroundColor: Colors[colorScheme ?? "light"].background,
            borderRadius: 25,
            shadowColor: "#000",
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
            borderTopWidth: 0,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
          },
          tabBarItemStyle: {
            paddingTop: 0,
            paddingBottom: 0,
            height: 50,
          },
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="pawprint" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: "Chat",
            tabBarIcon: ({ color }) => (
              <Ionicons name="chatbubble-outline" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="person" color={color} />
            ),
          }}
        />
      </Tabs>
    </CatsProvider>
  );
}
