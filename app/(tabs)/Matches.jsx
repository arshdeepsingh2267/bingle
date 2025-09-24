import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useMemo } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import matches from "../../store/matchesData";

const AvatarWithRing = ({ src }) => {
  return (
    <View className="h-16 w-16 rounded-full items-center justify-center">
      {/* Outer neon ring */}
      <LinearGradient
        colors={["#a855f7", "#6366f1"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 9999,
        }}
      />
      {/* Inner dark circle to create ring thickness */}
      <View className="h-[58px] w-[58px] rounded-full bg-black items-center justify-center">
        <Image source={src} className="h-14 w-14 rounded-full" />
      </View>
    </View>
  );
};

const Tag = ({ label }) => (
  <View className="px-3 py-1 rounded-full border border-white/30 mr-2 mb-2">
    <Text className="text-white text-xs">{label}</Text>
  </View>
);

const ProfileButton = ({ onPress }) => (
  <Pressable onPress={onPress} className="mt-4">
    <LinearGradient
      colors={["#6366f1", "#a855f7"]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={{ borderRadius: 9999 }}
    >
      <View className="px-6 py-3 rounded-full items-center">
        <Text className="text-white font-semibold">View Profile</Text>
      </View>
    </LinearGradient>
  </Pressable>
);

const MatchCard = ({ item }) => {
  const subtitle = useMemo(() => {
    if (item.bio) return item.bio;
    if (item.tags?.length) return null;
    return "";
  }, [item]);

  return (
    <View className="px-4">
      {/* Glass card with rounded corners */}
      <View className="rounded-3xl overflow-hidden">
        <BlurView intensity={25} tint="dark" style={{ width: "100%" }}>
          <View className="bg-[#0b0b12]/90 px-4 py-4 border border-white/10 rounded-3xl">
            <View className="flex-row">
              <AvatarWithRing src={item.avatar} />
              <View className="flex-1 pl-4">
                <Text className="text-white text-[22px] font-semibold">
                  {item.name}
                  <Text className="text-white">
                    {" "}
                    {item.gender}, {item.age}
                  </Text>
                </Text>

                {subtitle ? (
                  <Text className="text-white/80 mt-1 leading-5">
                    {subtitle}
                  </Text>
                ) : null}

                {item.tags?.length ? (
                  <View className="flex-row flex-wrap mt-2">
                    {item.tags.map((tag) => (
                      <Tag key={tag} label={tag} />
                    ))}
                  </View>
                ) : null}
              </View>
            </View>

            <ProfileButton
              onPress={() =>
                router.push({
                  pathname: "/profile/[id]",
                  params: { id: item.id },
                })
              }
            />
          </View>
        </BlurView>
      </View>
    </View>
  );
};

export default function Matches() {
  return (
    <View className="flex-1 bg-black">
      <SafeAreaView>
        {/* Header */}
        <View className="px-4 pt-4 pb-2">
          <Text className="text-white/90 text-xl">Matches Found — 7</Text>
        </View>
      </SafeAreaView>
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MatchCard item={item} />}
        ItemSeparatorComponent={() => <View className="h-4" />}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}
