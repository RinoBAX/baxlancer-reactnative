// components/TeamCard.tsx
import React from "react";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native";

interface TeamCardProps {
  name: string;
  role?: string;
  joinedAt?: string;
  avatarUrl?: string;
  onPress?: () => void;
  className?: string;
  rank?: number; // 0: gold, 1: silver, 2: bronze
}

const getBadge = (rank: number) => {
  const colors = ["#FFD700", "#C0C0C0", "#CD7F32"];
  return {
    backgroundColor: colors[rank],
    label: ["Juara 1", "Juara 2", "Juara 3"][rank],
  };
};

const TeamCard: React.FC<TeamCardProps> = ({
  name,
  role = "Member",
  joinedAt,
  avatarUrl,
  onPress,
  className,
  rank,
}) => {
  const badge = rank !== undefined ? getBadge(rank) : null;

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center p-4 bg-white rounded-xl shadow-md mb-3">
      <Image
        source={{
          uri: avatarUrl || "https://ui-avatars.com/api/?name=" + name,
        }}
        className="w-12 h-12 rounded-full mr-4"
        resizeMode="cover"
      />

      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-800">{name}</Text>
        <Text className="text-sm text-gray-500">{role}</Text>
        {joinedAt && (
          <Text className="text-xs text-gray-400">Joined {joinedAt}</Text>
        )}
      </View>

      {badge && (
        <View
          className="px-2 py-1 rounded-md"
          style={{ backgroundColor: badge.backgroundColor }}>
          <Text className="text-xs text-white font-bold">{badge.label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default TeamCard;
