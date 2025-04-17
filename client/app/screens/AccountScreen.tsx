import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  useColorScheme,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  PaperProvider,
  Text,
  MD3DarkTheme,
  DefaultTheme,
  Avatar,
  List,
  Divider,
  Surface,
} from "react-native-paper";

export default function AccountScreen() {
  const colorScheme = useColorScheme();
  const theme =
    colorScheme === "dark"
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

  return (
    <PaperProvider theme={theme}>
      <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Surface style={styles.profileHeader} elevation={2}>
          <Avatar.Text size={80} label="MS" style={styles.avatar} />
          <Text variant="headlineSmall" style={styles.name}>Max Schmidt</Text>
          <Text variant="bodyMedium">max.schmidt@example.com</Text>
        </Surface>

        <Surface style={styles.section} elevation={1}>
          <List.Item
            title="Profil bearbeiten"
            left={() => (<AntDesign name="user" size={24} color={theme.colors.primary} />)}
            right={() => (<AntDesign name="right" size={16} color={theme.colors.onSurfaceVariant} />)}
            onPress={() => {}}
            style={styles.listItem}
          />
          <Divider />
          <List.Item
            title="Passwort ändern"
            left={() => (<AntDesign name="lock" size={24} color={theme.colors.primary} />)}
            right={() => (<AntDesign name="right" size={16} color={theme.colors.onSurfaceVariant} />)}
            onPress={() => {}}
            style={styles.listItem}
          />
          <Divider />
          <List.Item
            title="Benachrichtigungen"
            left={() => (<AntDesign name="bells" size={24} color={theme.colors.primary} />)}
            right={() => (<AntDesign name="right" size={16} color={theme.colors.onSurfaceVariant} />)}
            onPress={() => {}}
            style={styles.listItem}
          />
        </Surface>

        <Surface style={styles.section} elevation={1}>
          <List.Item
            title="Über die App"
            left={() => (<AntDesign name="infocirlceo" size={24} color={theme.colors.primary} />)}
            right={() => (<AntDesign name="right" size={16} color={theme.colors.onSurfaceVariant} />)}
            onPress={() => {}}
            style={styles.listItem}
          />
          <Divider />
          <List.Item
            title="Abmelden"
            left={() => (<AntDesign name="logout" size={24} color={theme.colors.error} />)}
            onPress={() => {}}
            titleStyle={{ color: theme.colors.error }}
            style={styles.listItem}
          />
        </Surface>
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  profileHeader: {
    alignItems: "center",
    padding: 24,
    marginBottom: 16,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  avatar: {
    marginBottom: 12,
  },
  name: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  section: {
    marginBottom: 16,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  listItem: {
    padding: 16,
  },
});