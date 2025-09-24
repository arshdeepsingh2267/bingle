import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserById } from "../../lib/data";

const Chip = ({ text }) => (
  <View className="px-3 py-1 rounded-full border border-white/30 mr-2">
    <Text className="text-white">{text}</Text>
  </View>
);

export default function UserProfile() {
  const user = getUserById(3);

  if (!user) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <Text className="text-white/80">User not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView
        className="flex-1 bg-black"
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <View className="px-4 pt-4 pb-2 flex-row items-center justify-between">
          <Pressable hitSlop={10} onPress={() => router.back()}>
            <ArrowLeft color="#fff" size={24} />
          </Pressable>
          <Text className="text-white text-xl font-semibold">My Profile</Text>
          <View style={{ width: 24 }} />
        </View>
        <View className="flex justify-center items-center">
          <View className=" flex-1 justify-center items-center mt-2">
            <View className="h-72 w-56 rounded-[140px] overflow-hidden border border-white/10">
              <Image
                source={user.avatar}
                className="h-full w-full"
                resizeMode="cover"
              />
            </View>
          </View>

          <View className="px-6 mt-6 items-center">
            <Text className="text-white text-3xl font-semibold">
              {user.name}, {user.age}
            </Text>

            <View className="flex-row mt-3">
              {user.tags?.slice(0, 3).map((t) => (
                <Chip key={t} text={t} />
              ))}
            </View>

            {user.bio ? (
              <Text className="text-white/80 text-center mt-4">{user.bio}</Text>
            ) : null}

            {/* <Pressable
            onPress={() =>
              router.push({ pathname: "/chat/[id]", params: { id: user.id } })
            }
            className="w-full mt-8"
          >
            <LinearGradient
              colors={["#6366f1", "#a855f7"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={{ borderRadius: 9999 }}
            >
              <View className="px-6 py-4 rounded-full items-center">
                <Text className="text-white font-semibold">
                  Start Chat with {user.name}
                </Text>
              </View>
            </LinearGradient>
          </Pressable> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
