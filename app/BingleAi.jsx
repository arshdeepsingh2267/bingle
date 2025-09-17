import { BlurView } from "expo-blur";
import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import image from "../assets/images/Bingle.png";

export default function App() {
  return (
    <ImageBackground
      source={image}
      className="flex-1 justify-end p-6"
      resizeMode="cover"
    >
      {/* Dark overlay to ensure readability and avoid white flash */}
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <View className="flex-1 bg-black/40" />
      </View>

      {/* Content container */}
      <View className="flex-1">
        {/* Header */}
        <View className="items-center mt-20">
          <Text className="text-white text-3xl font-extrabold tracking-tight">
            Bingle<Text className="text-fuchsia-400">AI</Text>
          </Text>
        </View>

        {/* Bottom glass chat bubble */}
        <View className="px-5 absolute bottom-2 left-0 right-0">
          <View className="rounded-3xl overflow-hidden">
            {Platform.OS === "ios" ? (
              <BlurView intensity={50} tint="dark" style={{ width: "100%" }}>
                <View className="bg-[#151233]/80 px-4 py-4">
                  <Text className="text-white text-base leading-6">
                    Hey Gaurav. Welcome to{" "}
                    <Text className="font-semibold">Bingle AI</Text>. I can’t
                    wait to find the hottest, most happening club just for
                    tonight.
                  </Text>
                </View>
              </BlurView>
            ) : (
              // Android fallback for Expo Go: use tinted view instead of blur
              <View style={styles.androidGlass}>
                <Text className="text-white text-base leading-6">
                  Hey Gaurav. Welcome to{" "}
                  <Text className="font-semibold">Bingle AI</Text>. I can’t wait
                  to find the hottest, most happening club just for tonight.
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  androidGlass: {
    width: "100%",
    backgroundColor: "rgba(21, 18, 51, 0.7)",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
