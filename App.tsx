import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import "react-native-gesture-handler";
import { StatusBar } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import WelcomePage from "./src/screens/Welcome";
import TabNavigator from "./src/components/Tabs";
import LoginScreen from "./src/screens/Auth/Login";
import ResetPasswordScreen from "./src/screens/Auth/ResetPassword";
import UserSignup from "./src/screens/SignUp";
import HomeScreen from "./src/screens/Home";
import Profile from "./src/screens/Profile";

// Import the dotenv configuration

const Stack = createStackNavigator();
const StackNaviator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome Page"
        component={WelcomePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Reset Password" component={ResetPasswordScreen} />
      <Stack.Screen name="SignUp" component={UserSignup} />
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const App: React.FC = () => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#efb810",
    },
  };

  return (
    <SafeAreaProvider>
      <RootSiblingParent>
        <StatusBar backgroundColor="#efb810" />
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <StackNaviator />
          </NavigationContainer>
        </PaperProvider>
      </RootSiblingParent>
    </SafeAreaProvider>
  );
};

export default App;
