import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import {
  Image,
  Linking,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import mapImg from "../../assets/images/Map.png";
export default function Venue() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Header */}
      <View className="px-4 pt-2 pb-2 flex-row items-center justify-between">
        <Pressable hitSlop={10} onPress={() => router.back()}>
          <ArrowLeft color="#fff" size={24} />
        </Pressable>
        <Text className="text-white text-xl font-semibold">Live Map</Text>
        <View className="flex-row items-center">
          <Text className="text-emerald-300 font-semibold mr-1">127</Text>
          <Text className="text-white/80">Bingle</Text>
        </View>
      </View>

      {/* Content */}
      <View className="flex-1">
        {/* Headline */}
        <Text className="text-white text-2xl leading-8 px-4 mt-2">
          Amazing! There are tons of{"\n"}interesting people ready to{"\n"}
          connect.
        </Text>

        {/* Map card area */}
        <View className="px-4 mt-4">
          <View className="rounded-2xl overflow-hidden bg-white/5">
            {/* Replace with MapView if desired; using static image to match mock */}
            <TouchableOpacity
              onPress={async () => {
                const url = "https://maps.app.goo.gl/m85ZpZuVH3xC9y8K9";
                const supported = await Linking.canOpenURL(url);

                if (supported) {
                  await Linking.openURL(url);
                } else {
                  console.log("Don't know how to open URI: " + url);
                }
              }}
            >
              <Image
                source={mapImg}
                className="w-full h-80"
                resizeMode="cover"
              />
            </TouchableOpacity>
            {/* Pin callout overlay */}
            {/* <View className="absolute left-6 top-24">
              <View className="bg-black rounded-xl px-3 py-3 shadow-lg">
                <Text className="text-white font-semibold">Wild Thyme 🔥</Text>
                <Text className="text-white/80 mt-1">2.1 km • ★ 4.7</Text>
                <View className="mt-2 bg-white rounded-lg items-center py-1.5 px-2">
                  <Text className="text-black font-medium">Get Directions</Text>
                </View>
              </View>
            </View> */}

            {/* Floating avatar at bottom-left */}
            {/* <View className="absolute -bottom-6 left-6">
              <View className="h-16 w-16 rounded-full items-center justify-center">
                <LinearGradient
                  colors={["#a855f7", "#6366f1"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{ position: "absolute", inset: 0, borderRadius: 9999 }}
                />
                <View className="h-[58px] w-[58px] rounded-full bg-black items-center justify-center">
                  <Image source={bingle} className="h-14 w-14 rounded-full" />
                </View>
              </View>
            </View> */}
          </View>
        </View>

        {/* Spacer so banner doesn’t overlap content */}
        <View className="h-16" />
      </View>

      {/* Bottom gradient recommendation banner */}
      <View className="px-4 pb-6">
        <LinearGradient
          colors={["#6366f1", "#a855f7"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{ borderRadius: 16 }}
        >
          <View className="px-5 py-4 items-center">
            <Text className="text-white text-lg font-semibold text-center">
              I’ve found the best club based on{"\n"}your profile.
            </Text>
          </View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}
