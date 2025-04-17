import React from "react";
import { View, Animated, StyleSheet, ScrollView } from "react-native";

export default function ParallaxScrollView(props) {
  const { parallaxHeaderHeight, renderForeground, children } = props;

  const headerHeight = parallaxHeaderHeight || 200;

  return (
    <View style={{ flex: 1 }}>
      <Animated.ScrollView>
        {/* Nur wenn renderForeground existiert, wird es angezeigt */}
        {/* Andernfalls kein Fehler */}
        {renderForeground && renderForeground()}

        {/* children anzeigen */}
        {children}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: "#f5f5f5",
    position: "absolute",
    width: "100%",
    top: 0,
    // mehr Styling nach Bedarf
  },
});
