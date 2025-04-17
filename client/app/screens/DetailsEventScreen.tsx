import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  useColorScheme,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Title,
  DefaultTheme,
  PaperProvider,
  MD3DarkTheme,
  Text,
  Card,
  Button,
  Divider,
  List,
  Avatar,
} from "react-native-paper";
import {getEvents, getParticpantsForEvent, participate} from '../../api/api';
import {Event, User} from '../types/index';
import { ScrollView } from "react-native-gesture-handler";

interface ManageEventProps {
  item: Event;
}

// interface Participant {
//   name: string;
// }


let participants: User[] = [];

const currentUserName = async () => {
  try {
    return await AsyncStorage.getItem("userName") as string;
  }catch(e) {
    console.log(e);
  }
}


const ManageEvent = () => {
  const [participants, setParticipants] = useState<User[]>([]);

  async function loadParticipantsData() {
      const result = await getParticpantsForEvent(item.e_name, item.e_date);
      if (result) {
        setParticipants(result);
        for (let user of result){
            if (user.a_name == await currentUserName() as string){
              setIsParticipating(true);
            }
        }
      }
    }
    useEffect(() => {
      loadParticipantsData();
    }, [])

    loadParticipantsData();

  const route = useRoute();
  const { item } = route.params as { item: Event };


  const [isParticipating, setIsParticipating] = useState(false);

  const handleParticipation = async () => {
    const userName = await currentUserName();
    if (isParticipating) {
      setParticipants(participants.filter((p) => p.a_name !==  userName));
      setIsParticipating(false);
      await participate(userName as string, item.e_name, item.e_date, true);
    } else {
      if (participants.length >= item.e_max_count) {
        alert("Dieses Event ist bereits voll!");
        return;
      } else {
        await participate(userName as string, item.e_name, item.e_date, false);
      }

      // await participate(userName as string, item.title, item.date);
      const newParticipant: User = {
        a_name: userName as string
      };
      setParticipants(part => [...part, newParticipant as User]);
      setIsParticipating(true);
    }
  };
  //console.log("Teilnehmerliste:", participants);
  //console.log("Status:", isParticipating);

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


  const formatDate = (dateString: string) => {

    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("de-DE", options);
  };

  return (
    <PaperProvider theme={theme}>
      <Image
        source={{ uri: "https://as2.ftcdn.net/v2/jpg/00/89/42/63/1000_F_89426340_odlCQ56BBmZPSfAGDLUG54BWHKsn5tnj.jpg" }}
        style={styles.image}
      />
      <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Title style={styles.title}>{item.e_name}</Title>
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{item.e_category}</Text>
        </View>
        <Card>
          <Card.Content>
            <Text variant="bodyLarge">📅    {formatDate(item.e_date)}, {item.e_date} Uhr</Text>
            <Text variant="bodyLarge">📍    {item.e_location}</Text>
            <Text variant="bodyLarge">👤    Organisiert von: {item.e_organizer}</Text>
            <Text variant="bodyLarge">👥    {participants.length} von {item.e_max_count} Teilnehmern</Text>
          </Card.Content>
        </Card>
        <TouchableOpacity
        style={[
          styles.button,
          isParticipating ? styles.leaveButton : null,
          participants.length >= item.e_max_count && !isParticipating
            ? styles.disabledButton
            : null,
        ]}
        onPress={handleParticipation}
        disabled={
          participants.length >= item.e_max_count && !isParticipating
        }
      >
        <Text style={styles.buttonLabel}>
          {isParticipating ? "Teilnahme zurückziehen" : "Teilnehmen"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.participateButton,
          isParticipating ? styles.leaveButton : null,
          participants.length >= item.e_max_count && !isParticipating
            ? styles.disabledButton
            : null,
        ]}
        onPress={handleParticipation}
        disabled={
          participants.length >= item.e_max_count && !isParticipating
        }
      >
        <Text style={styles.buttonText}>
          {isParticipating ? "Teilnahme zurückziehen" : "Teilnehmen"}
        </Text>
      </TouchableOpacity>
        <Card>
          <Card.Title
            title="Teilnehmer"
            titleVariant="titleLarge"
          />
          <Card.Content>
            <FlatList
              data={participants}
              keyExtractor={(item) => item.a_name}
              scrollEnabled={false}
              renderItem={({ item, index }) => (
                <View>
                  <List.Item
                    title={item.a_name}
                    left={() => <Avatar.Text size={40} label={item.a_name} />} //item.name[0]
                  />
                  <Divider />
                </View>
              )}
              ListEmptyComponent={
                <Text>Noch keine Teilnehmer</Text>
              }
            />
          </Card.Content>
        </Card>
      </ScrollView>
    </PaperProvider>
  );
};

export default ManageEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 0
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
    fontWeight: "bold",
    fontSize: 24,
  },
  button: {
    height: 60,
    justifyContent: 'center',
    borderRadius: 100,
  },
  buttonLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  },


  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  header: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
  },
  categoryContainer: {
    backgroundColor: "#e0f7fa",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  category: {
    color: "#0097a7",
    fontWeight: "600",
  },
  detailsContainer: {
    backgroundColor: "#fff",
    padding: 16,
    marginTop: 12,
    borderRadius: 8,
    marginHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  detailIcon: {
    fontSize: 18,
    marginRight: 12,
    width: 24,
    textAlign: "center",
  },
  detailText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  participateButton: {
    backgroundColor: "#4caf50",
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 12,
    marginTop: 20,
    alignItems: "center",
  },
  leaveButton: {
    backgroundColor: "#f44336",
  },
  disabledButton: {
    backgroundColor: "#bdbdbd",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});