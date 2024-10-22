import { View, Text, ImageBackground } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";
import gameImage from "@/assets/game.jpg";
import AppGradient from "@/components/AppGradient";

const index = () => {
  const router = useRouter();

  return (
    <View className="flex-1">
      <ImageBackground source={gameImage} resizeMode="cover" className="flex-1">
        <AppGradient colors={["rgba(0,0,0, 0.4 )", "rgba(0,0,0, 0.8)"]}>
          <SafeAreaView className="flex-1 px-1 justify-between">
            <View>
              <Text className="text-center text-white font-bold text-4xl">
                Sudoku
              </Text>
              <Text className="text-center text-white text-regular text-2xl mt-3">
                Lets get playing
              </Text>
            </View>
            <View>
              <CustomButton
                onPress={() => router.push("./game")}
                title="Get Started"
              />
            </View>
            <StatusBar style="light" />
          </SafeAreaView>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default index;
