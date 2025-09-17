import { useRouter } from "expo-router";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import image from "../assets/images/Opening.jpg";
// const G = styled(LinearGradient);
// const image = { uri: "https://legacy.reactjs.org/logo-og.png" };
export default function IndexScreen() {
  // const [fontsLoaded] = useFonts({
  //   Inter_400Regular,
  //   Inter_600SemiBold,
  //   Inter_700Bold,
  // });

  // if (!fontsLoaded) return null;
  const route = useRouter();
  return (
    <ImageBackground
      source={image}
      className="flex-1 justify-end p-6"
      resizeMode="cover"
    >
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <View className="flex-1 bg-black/50" />
      </View>
      <View className=" flex-1 justify-center items-center">
        <Text className="text-white text-4xl font-bold mb-4">
          Find your night with <Text className="text-pink-500">Bingle AI</Text>
        </Text>
        <Text className="text-white text-base mb-8">
          Smart venue picks, real-time energy, instant matches.
        </Text>

        <TouchableOpacity
          onPress={() => route.push("/Gender")}
          className="bg-gray-800 py-3 px-2 rounded-lg mb-4"
        >
          <Text className="text-center text-lg text-white font-semibold">
            Sign in with Phone
          </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity className="bg-gradient-to-r from-pink-500 to-purple-500 py-3 rounded-lg">
          <Text className="text-center text-white font-semibold">
            Sign in with Phone
          </Text>
        </TouchableOpacity> */}
      </View>
    </ImageBackground>
  );
}
