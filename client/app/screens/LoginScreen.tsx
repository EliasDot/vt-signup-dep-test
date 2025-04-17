import React, { useState } from "react";
import {
  View,
  StyleSheet,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import {
  Text,
  TextInput,
  HelperText,
  Button,
  Title,
  Provider as PaperProvider,
  DefaultTheme,
  MD3DarkTheme,
} from "react-native-paper";
import { HomeScreenProps } from "../types";
import {signin, signup} from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }: HomeScreenProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark"
    ? {
        ...MD3DarkTheme,
        colors: {
          primary: "rgb(156, 215, 105)",
          onPrimary: "rgb(26, 55, 0)",
          primaryContainer: "rgb(40, 80, 0)",
          onPrimaryContainer: "rgb(183, 244, 129)",
          secondary: "rgb(130, 219, 126)",
          onSecondary: "rgb(0, 57, 10)",
          secondaryContainer: "rgb(0, 83, 18)",
          onSecondaryContainer: "rgb(157, 248, 152)",
          tertiary: "rgb(85, 219, 198)",
          onTertiary: "rgb(0, 55, 48)",
          tertiaryContainer: "rgb(0, 80, 71)",
          onTertiaryContainer: "rgb(118, 248, 226)",
          error: "rgb(255, 180, 171)",
          onError: "rgb(105, 0, 5)",
          errorContainer: "rgb(147, 0, 10)",
          onErrorContainer: "rgb(255, 180, 171)",
          background: "rgb(26, 28, 24)",
          onBackground: "rgb(227, 227, 220)",
          surface: "rgb(26, 28, 24)",
          onSurface: "rgb(227, 227, 220)",
          surfaceVariant: "rgb(68, 72, 62)",
          onSurfaceVariant: "rgb(196, 200, 186)",
          outline: "rgb(142, 146, 134)",
          outlineVariant: "rgb(68, 72, 62)",
          shadow: "rgb(0, 0, 0)",
          scrim: "rgb(0, 0, 0)",
          inverseSurface: "rgb(227, 227, 220)",
          inverseOnSurface: "rgb(47, 49, 44)",
          inversePrimary: "rgb(56, 107, 1)",
          elevation: {
            level0: "transparent",
            level1: "rgb(33, 37, 28)",
            level2: "rgb(36, 43, 31)",
            level3: "rgb(40, 49, 33)",
            level4: "rgb(42, 50, 34)",
            level5: "rgb(44, 54, 35)",
          },
          surfaceDisabled: "rgba(227, 227, 220, 0.12)",
          onSurfaceDisabled: "rgba(227, 227, 220, 0.38)",
          backdrop: "rgba(45, 50, 40, 0.4)",
        },
      }
    : {
        ...DefaultTheme,
        colors: {
          primary: "rgb(56, 107, 1)",
          onPrimary: "rgb(255, 255, 255)",
          primaryContainer: "rgb(183, 244, 129)",
          onPrimaryContainer: "rgb(13, 32, 0)",
          secondary: "rgb(16, 109, 32)",
          onSecondary: "rgb(255, 255, 255)",
          secondaryContainer: "rgb(157, 248, 152)",
          onSecondaryContainer: "rgb(0, 34, 4)",
          tertiary: "rgb(0, 107, 94)",
          onTertiary: "rgb(255, 255, 255)",
          tertiaryContainer: "rgb(118, 248, 226)",
          onTertiaryContainer: "rgb(0, 32, 27)",
          error: "rgb(186, 26, 26)",
          onError: "rgb(255, 255, 255)",
          errorContainer: "rgb(255, 218, 214)",
          onErrorContainer: "rgb(65, 0, 2)",
          background: "rgb(253, 253, 245)",
          onBackground: "rgb(26, 28, 24)",
          surface: "rgb(253, 253, 245)",
          onSurface: "rgb(26, 28, 24)",
          surfaceVariant: "rgb(224, 228, 214)",
          onSurfaceVariant: "rgb(68, 72, 62)",
          outline: "rgb(116, 121, 109)",
          outlineVariant: "rgb(196, 200, 186)",
          shadow: "rgb(0, 0, 0)",
          scrim: "rgb(0, 0, 0)",
          inverseSurface: "rgb(47, 49, 44)",
          inverseOnSurface: "rgb(241, 241, 234)",
          inversePrimary: "rgb(156, 215, 105)",
          elevation: {
            level0: "transparent",
            level1: "rgb(243, 246, 233)",
            level2: "rgb(237, 241, 226)",
            level3: "rgb(231, 237, 218)",
            level4: "rgb(229, 236, 216)",
            level5: "rgb(225, 233, 211)",
          },
          surfaceDisabled: "rgba(26, 28, 24, 0.12)",
          onSurfaceDisabled: "rgba(26, 28, 24, 0.38)",
          backdrop: "rgba(45, 50, 40, 0.4)",
        },
      };

  const { width } = useWindowDimensions();
  const buttonWidth = Math.min(width - 40, 600); // 100% - margin, maximal 600px

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const s_userName = async (item : string) => {
    try {
      await AsyncStorage.setItem("userName", item);
    } catch (e){
      console.log(e);
    }
  };

  const handleLogin = async () => {
    console.log("Logging in with:", name, password);
    if (await signin(name, password)){
      s_userName(name);
      navigation.navigate("Home");
    }else{
      alert("This user doesn't exist. Click ok to start the registering process.")
      let name = prompt("Name");
      let password = prompt("Password")
      if (await signup(name as string, password as string)) {
        alert("user: " + name + " is now registered.");
        s_userName(name as string);
        navigation.navigate("Home");
      } else {
        alert("error during registering process")
      }
    }
  };

  const hasErrors = () => { // return true zeigt Error
    return false;
  };

  return (
    <PaperProvider theme={theme}>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Title style={styles.title}>Login</Title>

        <View style={{ width: buttonWidth }}>
          <Text variant="labelMedium">
            Noch keinen Account? Dann klicke hier!
          </Text>
          {/* Link hinzufügen */}
          <TextInput
            label="Name"
            value={name}
            onChangeText={setName}
            mode="outlined"
            autoCapitalize="none"
            style={{marginBottom: 16}}
          />
          <TextInput
            label="Passwort"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry
          />
          <HelperText type="error" visible={hasErrors()}>
            Fehler: Name oder Passwort falsch!
          </HelperText>
          <Button mode="contained" onPress={handleLogin} style={styles.button}>
            Einloggen
          </Button>
        </View>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    marginBottom: 24,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
  },

  button: {
    marginTop: 16,
  },
});