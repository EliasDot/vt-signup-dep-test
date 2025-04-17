import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  useColorScheme,
  useWindowDimensions,
  Animated,
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { HomeScreenProps } from "../types";
import {
  DefaultTheme,
  PaperProvider,
  Title,
  MD3DarkTheme,
  Text,
  Card,
  Button,
  Avatar,
  FAB,
} from "react-native-paper";
import {getEvents} from '../../api/api';
import {Event} from '../types/index';
import { ScrollView } from "react-native-gesture-handler";


let eventData: Event[] = []


const renderEvent =
  (navigation: any) =>
  ({ item }: { item: Event }) => (
    <TouchableOpacity onPress={() => navigation.navigate("DetailsEvent", { item })}>
      <Card style={styles.card}>
        <ImageBackground
          source={{ uri: "https://as2.ftcdn.net/v2/jpg/00/89/42/63/1000_F_89426340_odlCQ56BBmZPSfAGDLUG54BWHKsn5tnj.jpg"}}
        >
          <View style={styles.overlay}>
            <Card.Title
              title={item.e_name}
              subtitle={`von ${item.e_organizer}`}
              titleVariant="titleLarge"
              left={(props) => <Avatar.Icon {...props} icon="heart" />}
            />
            <Card.Content>
              <Text variant="bodyLarge">
                {item.e_date} / {item.location}
              </Text>
            </Card.Content>
            <Card.Actions>
              <Button mode="contained" onPress={() => navigation.navigate("Account")}>
                Teilnehmen
              </Button>
            </Card.Actions>
          </View>
        </ImageBackground>
      </Card>
    </TouchableOpacity>
  );

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [eventData, setEventData] = useState<Event[]>([]);

  async function loadEventData() {
    const result = await getEvents();
    if (result) {
      setEventData(result);
    }
  }
  useEffect(() => {
    loadEventData();
  }, [])

  loadEventData();

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

  const { width: windowWidth, height: windowHeight } = useWindowDimensions(); // Width and height of window
  const buttonLeft = windowWidth / 2 - 175; // 50% - (button width / 2)

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleMenu = () => {
    const toValue = isMenuOpen ? 0 : 1;

    Animated.spring(animation, {
      toValue,
      friction: 6,
      useNativeDriver: true,
    }).start();

    setIsMenuOpen(!isMenuOpen);
  };

  const settingsTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -160],
  });

  const accountTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -110],
  });

  const addEventTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -60],
  });

  return (
    <PaperProvider theme={theme}>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Title style={styles.title}>Meine Events</Title>

        <View style={{height: windowHeight}}> {/* Fix for scrolling on web */}
          <FlatList
            data={eventData}
            renderItem={renderEvent(navigation)}
            keyExtractor={(item) => item.e_name}
            contentContainerStyle={styles.list}
          />
        </View>

        <View style={[styles.menuContainer, {left: buttonLeft}]}>
          <Animated.View
            style={[styles.menuButton, { transform: [{ translateY: settingsTranslateY }] }]}
          >
            <FAB
              icon="cog"
              style={[styles.fab, {backgroundColor: theme.colors.primary}]}
              color={theme.colors.onPrimary}
              customSize={70}
              onPress={() => navigation.navigate("Settings")}
            />
          </Animated.View>

          <Animated.View
            style={[styles.menuButton, { transform: [{ translateY: accountTranslateY }] }]}
          >
            <FAB
              icon="account"
              style={[styles.fab, {backgroundColor: theme.colors.secondary}]}
              color={theme.colors.onSecondary}
              customSize={70}
              variant="secondary"
              onPress={() => navigation.navigate("Account")}
            />
          </Animated.View>

          <Animated.View
            style={[styles.menuButton, { transform: [{ translateY: addEventTranslateY }] }]}
          >
            <FAB
              icon="calendar"
              style={[styles.fab, {backgroundColor: theme.colors.tertiary}]}
              color={theme.colors.onTertiary}
              customSize={70}
              onPress={() => navigation.navigate("AddEvent")}
            />
          </Animated.View>

          <FAB
            icon={isMenuOpen ? "close" : "plus"}
            style={styles.fab}
            customSize={70}
            onPress={toggleMenu}
          />
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 0,
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
    fontWeight: "bold",
    fontSize: 24,
  },
  list: {
    flexGrow: 1,
    paddingBottom: 100,
    overflowY: 'none',
  },
  card: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  fab: {
    bottom: 20,
  },
  menuContainer: {
    position: "absolute",
    bottom: 0,
  },
  menuButton: {
    position: "absolute",
    bottom: 0,
  },
});
