import {useTheme} from "@/context/ThemeContext";
import {Ionicons} from "@expo/vector-icons";
import {PlatformPressable} from "@react-navigation/elements";
import {Tabs} from "expo-router";
import {StatusBar} from "expo-status-bar";
import * as Haptics from "expo-haptics";

export default function TabsLayout() {
  const {theme, isDark} = useTheme();

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Tabs
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTitleStyle: {
            fontFamily: "Montserrat_700Bold",
            color: theme.foreground,
          },
          headerTintColor: theme.foreground,
          headerBackTitleStyle: {
            fontFamily: "Montserrat_400Regular",
          },
          sceneStyle: {
            backgroundColor: theme.background,
          },
          tabBarStyle: {
            backgroundColor: theme.background,
            paddingTop: 10,
          },
          animation: "fade",
          tabBarActiveTintColor: theme.foreground,
          tabBarInactiveTintColor: "grey",
          tabBarShowLabel: false,
          tabBarButton: (props) => (
            <PlatformPressable
              {...props}
              onPressIn={(e) => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
                props.onPressIn?.(e);
              }}
            />
          ),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({color, size}) => <Ionicons name="home" color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            headerShown: true,
            tabBarIcon: ({color, size}) => <Ionicons name="settings" color={color} size={size} />,
          }}
        />
      </Tabs>
    </>
  );
}
