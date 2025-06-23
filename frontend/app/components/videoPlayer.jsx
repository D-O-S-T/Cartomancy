import React, { useRef } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Video } from "expo-av";

const { width } = Dimensions.get("window");

export default function VideoPlayer({ source }) {
  const videoRef = useRef(null);

  return (
    <View style={styles.videoContainer}>
      <Video
        ref={videoRef}
        source={source}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="contain"
        useNativeControls
        style={styles.video}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  videoContainer: {
    width: "100%",
    maxWidth: 320,
    height: 180,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 30,
  },
  video: {
    width: "100%",
    height: "100%",
  },
});
