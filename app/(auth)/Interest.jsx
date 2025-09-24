import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Interest() {
  const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState([]);

  const allInterests = [
    { id: "1", label: "Photography" },
    { id: "2", label: "Karaoke" },
    { id: "3", label: "Cooking" },
    { id: "4", label: "Tennis" },
    { id: "5", label: "Shopping" },
    { id: "6", label: "Swimming" },
    { id: "7", label: "Art" },
    { id: "8", label: "Traveling" },
    { id: "9", label: "Music" },
    { id: "10", label: "Music" },
  ];

  const toggleInterest = (id) => {
    setSelectedInterests(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((item) => item !== id) // remove if already selected
          : [...prevSelected, id] // add if not selected
    );
  };

  const isValid = selectedInterests.length > 0;

  return (
    <SafeAreaView className="flex-1 bg-black px-6 justify-between">
      <TouchableOpacity
        onPress={() => router.back()}
        className="w-8 h-8 justify-center items-center"
      >
        <ArrowLeft name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <Text className="text-white text-3xl font-bold mt-6 mb-2">
          Your interests
        </Text>
        <Text className="text-gray-400 text-base mb-4">
          Select a few of your interests and let everyone know what you're
          passionate about.
        </Text>

        <FlatList
          data={allInterests}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => {
            const isSelected = selectedInterests.includes(item.id);
            return (
              <TouchableOpacity
                onPress={() => toggleInterest(item.id)}
                className={`w-[48%] py-3 px-4 mb-4 rounded-lg flex-row items-center ${
                  isSelected ? "bg-pink-500 " : "bg-gray-800"
                }`}
              >
                <Text className="text-white text-base ml-2">{item.label}</Text>
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>

      <TouchableOpacity
        className={`py-4 rounded-lg mb-6 ${
          isValid ? "bg-pink-500" : "bg-gray-700"
        }`}
        disabled={!isValid}
        onPress={() => {
          console.log("Selected interests:", selectedInterests);
          router.push("/BingleAi"); // adjust this to your next route
        }}
      >
        <Text className="text-center text-white text-lg font-bold">
          Continue
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
