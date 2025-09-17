import { BlurView } from "expo-blur";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
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

      {/* Content container must be flex-1 to occupy space */}
      <View className="flex-1">
        {/* Header */}
        <View className="items-center mt-20">
          <Text className="text-white text-3xl font-extrabold tracking-tight">
            Bingle<Text className="text-fuchsia-400">AI</Text>
          </Text>
        </View>

        {/* Bottom glass chat bubble */}
        <View className="px-5 absolute bottom-2 pb-8">
          {/* Keep overflow-hidden on wrapper for rounded corners on BlurView */}
          <View className="rounded-3xl overflow-hidden">
            <BlurView
              intensity={50}
              tint="dark"
              // Android blur is experimental; enable to avoid blank/white in some cases
              experimentalBlurMethod="dimezisBlurView"
              style={{ width: "100%" }}
            >
              <View className="bg-[#151233]/80 px-4 py-4">
                <Text className="text-white text-base leading-6">
                  Hey Gaurav. Welcome to{" "}
                  <Text className="font-semibold">Bingle AI</Text>. I can’t wait
                  to find the hottest, most happening club just for tonight.
                </Text>
              </View>
            </BlurView>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

{
  /* <LinearGradient
  colors={["#0b0620", "#0b0620", "#150b3e", "#220a5e"]}
  start={{ x: 0.2, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={{ position: "absolute", inset: 0 }}
/>;


<View pointerEvents="none">
  <LinearGradient
    colors={["#ff00ff60", "#00000000"]}
    start={{ x: 0.5, y: 0.5 }}
    end={{ x: 1, y: 1 }}
    style={{
      position: "absolute",
      top: -40,
      left: -40,
      height: 320,
      width: 320,
      borderRadius: 9999,
      opacity: 0.4,
    }}
  />
  <LinearGradient
    colors={["#4f46e560", "#00000000"]}
    start={{ x: 0.3, y: 0.3 }}
    end={{ x: 1, y: 1 }}
    style={{
      position: "absolute",
      top: 96,
      right: 0,
      height: 384,
      width: 384,
      borderRadius: 9999,
      opacity: 0.4,
    }}
  />
</View>; */
}
