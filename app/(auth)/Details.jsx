import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";

export default function UserDetailsScreen() {
  const router = useRouter();

  const [countryCode, setCountryCode] = useState("IN");
  const [callingCode, setCallingCode] = useState("91");

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^\d+$/, "Enter a valid phone number"),
  });

  return (
    <SafeAreaView className="flex-1 bg-black px-6 justify-between">
      <Formik
        initialValues={{ fullName: "", phoneNumber: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // Alert.alert("Form Submitted", JSON.stringify(values, null, 2));
          router.push("/Otp");
          // You can navigate or process data here
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
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
                Let’s get to know you
              </Text>
              <Text className="text-gray-400 text-base mb-8">
                Enter your name and mobile number so we can personalize your
                experience and keep your account secure.
              </Text>

              {/* Full Name Input */}
              <Text className="text-white text-sm mb-2">Full name</Text>
              <TextInput
                placeholder="Full name"
                placeholderTextColor="#888"
                className="bg-gray-800 text-white rounded-lg p-4 mb-4"
                onChangeText={handleChange("fullName")}
                onBlur={handleBlur("fullName")}
                value={values.fullName}
              />
              {touched.fullName && errors.fullName && (
                <Text className="text-red-500 mb-4">{errors.fullName}</Text>
              )}

              {/* Phone Number Input */}
              <Text className="text-white text-sm mb-2">Mobile number</Text>
              <View className="flex-row bg-gray-800 rounded-lg items-center p-4 mb-4">
                <CountryPicker
                  countryCode={countryCode}
                  withFlag
                  withCallingCode
                  withFilter
                  onSelect={(country) => {
                    setCountryCode(country.cca2);
                    setCallingCode(country.callingCode[0]);
                  }}
                />
                <Text className="text-white mr-2">+{callingCode}</Text>
                <TextInput
                  placeholder="Mobile number"
                  placeholderTextColor="#888"
                  className="flex-1 text-white"
                  keyboardType="phone-pad"
                  onChangeText={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  value={values.phoneNumber}
                />
              </View>
              {touched.phoneNumber && errors.phoneNumber && (
                <Text className="text-red-500 mb-4">{errors.phoneNumber}</Text>
              )}
            </View>

            {/* Continue Button */}
            <TouchableOpacity
              className={`py-4 rounded-lg mb-6 ${
                values.fullName && values.phoneNumber
                  ? "bg-pink-500"
                  : "bg-gray-700"
              }`}
              disabled={!(values.fullName && values.phoneNumber)}
              onPress={handleSubmit}
            >
              <Text
                className={`text-center ${values.fullName && values.phoneNumber ? "text-white" : "text-gray-400"} text-lg font-bold`}
              >
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}
