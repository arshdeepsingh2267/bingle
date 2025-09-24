import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Martini, Send, Utensils } from "lucide-react-native";
import { useRef, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { getUserById } from "../../lib/data";

const initialMessages = [
  { id: "m1", from: "them", text: "Hey Gaurav! How’s it going?" },
  {
    id: "m2",
    from: "me",
    text: "Great! Just getting started at Wild Thyme 🍸",
  },
  {
    id: "m3",
    from: "them",
    text: "That sounds fun. Have you been here before?",
  },
  { id: "m4", from: "me", text: "Nope, first time!" },
];

const Bubble = ({ side, children }) => {
  const isMe = side === "me";
  return (
    <View
      className={`px-4 py-2 rounded-2xl max-w-[80%] ${
        isMe ? "self-end bg-violet-600" : "self-start bg-white/10"
      }`}
    >
      <Text className="text-white">{children}</Text>
    </View>
  );
};

export default function Chat() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const user = getUserById(id);

  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const listRef = useRef(null);

  const scrollToBottom = (animated = true) =>
    listRef.current?.scrollToEnd({ animated });

  const send = () => {
    if (!input.trim()) return;
    const msg = { id: Date.now().toString(), from: "me", text: input.trim() };
    setMessages((prev) => [...prev, msg]);
    setInput("");
    // allow layout pass after state update
    setTimeout(() => scrollToBottom(true), 30);
  };

  if (!user) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <Text className="text-white/80">User not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* StatusBar to ensure proper contrast and avoid overlay surprises */}
      <StatusBar barStyle="light-content" />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"} // Android works with resize
        keyboardVerticalOffset={0}
      >
        {/* Screen column layout: header (fixed) + list (flex) + quick actions + composer */}
        <View className="flex-1">
          {/* Sticky header */}
          <View className="px-4 pt-4 pb-2 flex-row items-center">
            <Pressable
              hitSlop={10}
              onPress={() => router.back()}
              className="mr-3"
            >
              <ArrowLeft color="#fff" size={24} />
            </Pressable>
            <Image source={user.avatar} className="h-8 w-8 rounded-full mr-2" />
            <Text className="text-white text-lg font-semibold">
              {user.name}
            </Text>
          </View>

          {/* Scrollable messages */}
          <FlatList
            ref={listRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="px-4 py-2">
                <Bubble side={item.from}>{item.text}</Bubble>
              </View>
            )}
            style={{ flex: 1 }} // critical so the list shrinks when keyboard shows
            contentContainerStyle={{ paddingVertical: 8 }}
            keyboardShouldPersistTaps="handled"
            onContentSizeChange={() => scrollToBottom(true)}
            onLayout={() => setTimeout(() => scrollToBottom(false), 0)}
          />

          {/* Fixed quick actions */}
          <View className="px-4 pb-3">
            <View className="flex-row justify-between">
              <Pressable className="flex-row items-center px-4 py-3 rounded-2xl border border-white/20 bg-white/5 mr-3">
                <Martini color="#fff" size={18} />
                <Text className="text-white ml-2">Offer a Drink</Text>
              </Pressable>
              <Pressable className="flex-row items-center px-4 py-3 rounded-2xl border border-white/20 bg-white/5">
                <Utensils color="#fff" size={18} />
                <Text className="text-white ml-2">Share a Table</Text>
              </Pressable>
            </View>
          </View>

          {/* Fixed composer; safe-area bottom so it never hides behind nav bar */}
          <View
            className="flex-row items-center px-4"
            style={{ paddingBottom: Math.max(insets.bottom, 8) }}
          >
            <View className="flex-1 border border-white/15 rounded-full bg-white/5 px-4 py-3 mr-3">
              <TextInput
                placeholder="Message..."
                placeholderTextColor="#bfbfbf"
                value={input}
                onChangeText={setInput}
                className="text-white"
                returnKeyType="send"
                onSubmitEditing={send}
              />
            </View>
            <Pressable
              onPress={send}
              className="h-12 w-12 rounded-full items-center justify-center"
              style={{ backgroundColor: "#7c3aed" }}
            >
              <Send color="#fff" size={20} />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
