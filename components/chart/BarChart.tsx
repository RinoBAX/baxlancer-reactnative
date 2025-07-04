import React from "react";
import { ActivityIndicator, Dimensions, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { BarChart } from "react-native-gifted-charts";
import CardContainer from "../CustomCard";
import NoResults from "../NoResults";

const { width: screenWidth } = Dimensions.get("window");

export type ServiceBarData = {
  name: string; // "Senin", "Selasa", etc
  pending: number;
  approved: number;
  rejected: number;
};

type Props = {
  title?: string;
  data: ServiceBarData[];
  isLoading?: boolean;
  filterType: "weekly" | "monthly";
  onChangeFilterType: (value: "weekly" | "monthly") => void;
};

const CustomBarChart: React.FC<Props> = ({
  title = "Bar Chart",
  data,
  isLoading,
  filterType,
  onChangeFilterType,
}) => {
  const chartData = data.flatMap((item) => {
    // const label = item.name.slice(0, 3);
    const label = item.name;
    return [
      {
        value: item.pending,
        frontColor: "#FF7F50",
        gradientColor: "#FCD34D",
        spacing: 4,
        label,
      },
      {
        value: item.approved,
        frontColor: "#10B981",
        gradientColor: "#34D399",
        spacing: 4,
      },
      {
        value: item.rejected,
        frontColor: "#DC2626",
        gradientColor: "#F87171",
        spacing: 4,
      },
    ];
  });

  const renderLegend = () => (
    <View className="flex-row justify-evenly mt-12">
      <View className="flex-row items-center">
        <View className="size-3 rounded-3xl bg-bax-sunset mr-2" />
        <Text className="font-rubik-light text-xs text-bax-midnight">
          Pending
        </Text>
      </View>
      <View className="flex-row items-center">
        <View className="size-3 rounded-3xl bg-[#10B981] mr-2" />
        <Text className="font-rubik-light text-xs text-bax-midnight">
          Approve
        </Text>
      </View>
      <View className="flex-row items-center">
        <View className="size-3 rounded-3xl bg-destructive mr-2" />
        <Text className="font-rubik-light text-xs text-bax-midnight">
          Rejected
        </Text>
      </View>
    </View>
  );

  return (
    <CardContainer title={title}>
      {/* Filter Dropdown */}
      <View className="mb-4">
        <Text className="text-sm font-semibold mb-2 text-bax-midnight">
          Filter Data:
        </Text>
        <View className="bg-white border border-gray-200 rounded-lg">
          <Picker
            selectedValue={filterType}
            onValueChange={onChangeFilterType}>
            <Picker.Item
              label="Mingguan"
              value="weekly"
            />
            <Picker.Item
              label="Bulanan"
              value="monthly"
            />
          </Picker>
        </View>
      </View>

      {/* Loading State */}
      {isLoading && (
        <View className="py-4 justify-center items-center">
          <ActivityIndicator
            size="large"
            color="#407BFF"
          />
          <Text className="text-gray-500 mt-2 text-sm">Memuat data...</Text>
        </View>
      )}

      {/* Empty State */}
      {!isLoading && data.length === 0 && (
        <View className="py-4">
          <NoResults />
        </View>
      )}

      {/* Chart */}
      {!isLoading && data.length > 0 && (
        <>
          <BarChart
            data={chartData}
            height={200}
            width={screenWidth - 40}
            minHeight={5}
            barWidth={10}
            initialSpacing={10}
            spacing={14}
            barBorderRadius={4}
            showGradient
            yAxisThickness={0}
            xAxisThickness={0}
            xAxisType={"dashed"}
            xAxisColor={"lightgray"}
            rotateLabel
            roundedTop
            roundedBottom
            noOfSections={6}
            xAxisLabelTextStyle={{ color: "gray" }}
            yAxisTextStyle={{ color: "gray" }}
            labelWidth={40}
            showLine
            isAnimated
            animationDuration={300}
            lineConfig={{
              color: "#407BFF",
              thickness: 3,
              curved: true,
              hideDataPoints: true,
              shiftY: 20,
              initialSpacing: -30,
            }}
          />
          {renderLegend()}
        </>
      )}
    </CardContainer>
  );
};

export default CustomBarChart;
