import { Tabs } from "expo-router";
import { LocateIcon, Map, User, Users } from "lucide-react-native";

// import { Colors } from "../../constants/Colors";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FF6EC7",
        tabBarInactiveTintColor: "#FFF",
        tabBarStyle: {
          backgroundColor: "#000",
          paddingBottom: 14,
          height: 75,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
      }}
    >
      <Tabs.Screen
        name="Map"
        options={{
          title: "Map",
          tabBarIcon: ({ color }) => <Map size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Venue"
        options={{
          title: "Venue",
          tabBarIcon: ({ color, size }) => (
            <LocateIcon size={size ?? 24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Matches"
        options={{
          title: "Matches",
          tabBarIcon: ({ color, size }) => (
            <Users size={size ?? 24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <User size={size ?? 24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
