import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GenderSelectionScreen() {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = ["Female", "Male", "Other"];
  const route = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-black px-6 justify-between">
      <View>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => route.push("/")}
          className="w-8 h-8 justify-center items-center"
        >
          <ArrowLeft name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Heading */}
        <Text className="text-white text-3xl font-bold mt-6 mb-2">
          How do you identify?
        </Text>
        <Text className="text-gray-400 text-base mb-8">
          Pick what fits best
        </Text>

        {/* Options */}
        <View className="space-y-4">
          {options.map((option) => {
            const isSelected = selectedOption === option;
            return (
              <TouchableOpacity
                key={option}
                id={option}
                className={`rounded-lg py-4 text-white items-center my-2 border-2 ${
                  isSelected
                    ? "border-pink-500 text-white"
                    : "border-transparent text-white"
                } bg-gray-800`}
                onPress={() => setSelectedOption(option)}
              >
                <Text className="text-white text-base font-semibold">
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Start Button */}
      <TouchableOpacity
        className={`py-4 rounded-lg mb-6 ${
          selectedOption ? "bg-pink-500" : "bg-gray-700"
        }`}
        disabled={!selectedOption}
        onPress={() => {
          route.push("/Details");
          console.log("Starting with:", selectedOption);
        }}
      >
        <Text className="text-center text-white text-lg font-bold">Start</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
