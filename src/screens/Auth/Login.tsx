import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  TextInput,
  Button,
  Text,
  ActivityIndicator,
  HelperText,
} from "react-native-paper";
import { useStore } from "../../components/store";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { User } from "../../components/store";

import Constants from "expo-constants";

// import Colors from '../../../constants/Colors';

interface LoginProps {
  navigation: {
    navigate: (arg0: string, slug?: any) => void;
  };
}

const LoginScreen = ({ navigation }: LoginProps) => {
  // Access environment variables only when Constants.manifest is available
  if (Constants.manifest) {
    const API_BASE_URL =
      Constants.manifest.extra?.API_BASE_URL || "default_api_base_url";
    const DEBUG = Constants.manifest.extra?.DEBUG || "false";

    console.log(API_BASE_URL); // Output: 'https://api.example.com' or 'default_api_base_url'
    console.log(DEBUG); // Output: 'true' or 'false'
  } else {
    console.warn(
      "Constants.manifest is not available. Please check your app configuration."
    );
  }
  const [email, setEmail] = useState("Lavinia_Little71@yahoo.com");
  const [password, setPassword] = useState("password");
  const { signIn } = useStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await signIn(email, password);
      setLoading(false);

      if (result) {
        // console.log(result, "result");
        // navigation.navigate("Home");
        const loginSlugDetails: User = result;
        navigation.navigate('Home', { slug: loginSlugDetails });
      }
    } catch (error) {
      setError("Something went wrong, please try again");
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/SparkplugLogo.png")}
        style={{ marginLeft: "auto", marginRight: "auto", marginBottom: 50 }}
      />
      {error && (
        <Text style={{ color: "red", fontWeight: "bold" }}>{error}</Text>
      )}
      <TextInput
        label="Email"
        value={email}
        disabled={loading}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        mode="outlined"
        outlineColor="#000"
        activeOutlineColor={Colors.light.tint}
      />
      <TextInput
        label="Password"
        disabled={loading}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
        mode="outlined"
        activeOutlineColor={Colors.light.tint}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Reset Password")}>
        <Text>Forgot Your Password?</Text>
      </TouchableOpacity>
      <Button
        mode="contained"
        onPress={() => handleLogin()}
        style={styles.button}
        loading={loading}
      >
        Login
      </Button>
      <HelperText type="error" visible={error as any}>
        {error}
      </HelperText>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 50,
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    // backgroundColor: Colors.light.tint,
  },
});
