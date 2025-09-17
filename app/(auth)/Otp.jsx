import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Otp() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const correctOtp = "2233";

  const isComplete = otp.length === 4;

  const handleContinue = () => {
    if (otp === correctOtp) {
      // Alert.alert("Success", "Correct OTP!");
      router.push("/Age");
    } else {
      Alert.alert("Error", "Wrong OTP!");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black px-6 justify-center">
      <View className="items-center">
        <Text className="text-white text-3xl font-bold mb-8 text-center">
          Enter the 4-digit code
        </Text>

        <TextInput
          value={otp}
          onChangeText={(text) => {
            if (/^\d*$/.test(text) && text.length <= 4) {
              setOtp(text);
            }
          }}
          placeholder="Enter OTP"
          placeholderTextColor="#888"
          keyboardType="number-pad"
          maxLength={4}
          className="w-48 text-center text-white text-xl border-b-2 border-pink-500 pb-2 mb-8"
        />

        <TouchableOpacity
          className={`w-full py-4 rounded-lg mb-4 ${
            isComplete ? "bg-pink-500" : "bg-gray-700"
          }`}
          disabled={!isComplete}
          onPress={handleContinue}
        >
          <Text
            className={`text-center ${isComplete ? "text-white" : "text-gray-400"} text-lg font-bold`}
          >
            Continue
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Alert.alert("Resend OTP", "OTP has been resent.")}
        >
          <Text className="text-gray-400 text-sm">Resend code</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
