import { Text, Image, ImageSourcePropType, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import icons from "@/constants/icons";

const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
}) => (
  <View className="flex-1 mt-3 flex flex-col items-center">
    <Image
      source={icon}
      tintColor={focused ? "#2563EB" : "#3C3C43"}
      resizeMode="contain"
      className="size-6"
    />
    <Text
      className={`${
        focused
          ? "text-bluePrimary font-rubik-medium"
          : "text-bax-grey/40 font-rubik"
      } text-xs w-full text-center mt-1`}>
      {title}
    </Text>
  </View>
);

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          position: "absolute",
          minHeight: 80,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.homeOutline}
              title="Home"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="project"
        options={{
          title: "Project",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.project}
              title="Project"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: "Report",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.report}
              title="Report"
            />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="qris"
        options={{
          title: "Qris",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            // <TabIcon focused={focused} icon={icons.save} title="Project" />
            <View className="absolute -top-10 bg-white p-2 rounded-full border-[1px] border-[#0061FF]">
              <View className="bg-[#0061FF] w-14 h-14 rounded-full items-center justify-center">
                <Image
                  source={icons.search}
                  className="w-7 h-7"
                  tintColor="white"
                />
              </View>
            </View>
          ),
        }}
      /> */}
      {/* <Tabs.Screen
        name="Qris"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="absolute -top-6 bg-white p-3 rounded-full border-[4px] border-[#0061FF]">
              <View className="bg-[#0061FF] w-14 h-14 rounded-full items-center justify-center">
                <Image
                  source={icons.search}
                  className="w-7 h-7"
                  tintColor="white"
                />
              </View>
            </View>
          ),
        }}
      /> */}
      <Tabs.Screen
        name="downlines"
        options={{
          title: "Downlines",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.people}
              title="Team"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.person}
              title="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _Layout;
