import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";

export default function Age() {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    age: Yup.number()
      .required("Age is required")
      .typeError("Age must be a number")
      .integer("Age must be a whole number")
      .min(18, "You must be at least 18 years old"),
  });

  return (
    <SafeAreaView className="flex-1 bg-black px-6 justify-between">
      <Formik
        initialValues={{ age: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          router.push("/Interest");
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => {
          // Check if age is valid number and >=18
          const isValidAge =
            !errors.age && values.age && Number(values.age) >= 18;

          return (
            <View className="flex-1 justify-between">
              <View>
                {/* Back Button */}
                <TouchableOpacity
                  onPress={() => router.back()}
                  className="w-8 h-8 justify-center items-center"
                >
                  <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>

                {/* Heading */}
                <Text className="text-white text-3xl font-bold mt-6 mb-2">
                  What is your Age?
                </Text>
                <Text className="text-gray-400 text-base mb-8">
                  Enter your age to continue.
                </Text>

                {/* Age Input */}
                <Text className="text-white text-sm mb-2">Age</Text>
                <TextInput
                  placeholder="Your age"
                  placeholderTextColor="#888"
                  className="bg-gray-800 text-white rounded-lg p-4 mb-4"
                  keyboardType="number-pad"
                  onChangeText={handleChange("age")}
                  onBlur={handleBlur("age")}
                  value={values.age}
                />
                {touched.age && errors.age && (
                  <Text className="text-red-500 mb-4">{errors.age}</Text>
                )}
              </View>

              {/* Continue Button */}
              <TouchableOpacity
                className={`py-4 rounded-lg mb-6 ${
                  isValidAge ? "bg-pink-500" : "bg-gray-700"
                }`}
                disabled={!isValidAge}
                onPress={handleSubmit}
              >
                <Text
                  className={`text-center ${isValidAge ? "text-white" : "text-gray-400"} text-lg font-bold`}
                >
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
}
