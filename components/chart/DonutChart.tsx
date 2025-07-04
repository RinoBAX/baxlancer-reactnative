import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import CardContainer from "../CustomCard";
import NoResults from "../NoResults";
import { Picker } from "@react-native-picker/picker";

export type DonutChartData = {
  label: string;
  value: number;
  percentage: number;
};

type Props = {
  title?: string;
  data: DonutChartData[];
  colors?: string[]; // Optional, default color palette
  isLoading?: boolean;
  filterType: "weekly" | "monthly";
  onChangeFilterType: (value: "weekly" | "monthly") => void;
};

const defaultColors = ["#FF7F50", "#10B981", "#DC2626"];

const CustomDonutChart: React.FC<Props> = ({
  title = "Donut Chart",
  data,
  colors = defaultColors,
  isLoading,
  filterType,
  onChangeFilterType,
}) => {
  if (!data || data.length === 0) return null;

  const topItem = data.reduce((prev, current) =>
    current.percentage > prev.percentage ? current : prev
  );

  const labelColorMap: Record<string, string> = {
    Pending: "#FF7F50",
    Approved: "#10B981",
    Rejected: "#DC2626",
  };

  const pieData = data.map((item) => ({
    value: item.percentage,
    color:
      labelColorMap[item.label] || colors[data.indexOf(item) % colors.length],
    gradientCenterColor:
      labelColorMap[item.label] || colors[data.indexOf(item) % colors.length],
    focused: item.label === topItem.label,
  }));

  const renderDot = (color: string) => (
    <View
      style={{
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: color,
        marginRight: 10,
      }}
    />
  );

  const renderLegend = () => (
    <View style={{ marginTop: 20 }}>
      {data.map((item, index) => {
        const color =
          labelColorMap[item.label] || colors[index % colors.length];
        return (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
              justifyContent: "center",
            }}>
            {renderDot(color)}
            <Text style={{ color: "#1F2937" }}>
              {item.label}: {item.percentage.toFixed(2)}%
            </Text>
          </View>
        );
      })}
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

      {!isLoading && data.length > 0 && (
        <>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <PieChart
              data={pieData}
              donut
              showGradient
              sectionAutoFocus
              radius={90}
              innerRadius={60}
              innerCircleColor={"#232B5D"}
              centerLabelComponent={() => (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}>
                  <Text
                    style={{
                      fontSize: 22,
                      color: "white",
                      fontWeight: "bold",
                    }}>
                    {topItem.percentage.toFixed(2)}%
                  </Text>
                  <Text style={{ fontSize: 14, color: "white" }}>
                    {topItem.label}
                  </Text>
                </View>
              )}
            />
          </View>
          {renderLegend()}
        </>
      )}
    </CardContainer>
  );
};

export default CustomDonutChart;

// import { View, Text } from "react-native";
// import React from "react";
// import CardContainer from "../CustomCard";
// import { PieChart } from "react-native-gifted-charts";

// const CustomDonutChart = () => {
//   const pieData = [
//     {
//       value: 47,
//       color: "#009FFF",
//       gradientCenterColor: "#006DFF",
//       focused: true,
//     },
//     { value: 40, color: "#93FCF8", gradientCenterColor: "#3BE9DE" },
//     { value: 16, color: "#BDB2FA", gradientCenterColor: "#8F80F3" },
//     { value: 3, color: "#FFA5BA", gradientCenterColor: "#FF7F97" },
//   ];

//   const renderDot = (color: string) => (
//     <View
//       style={{
//         height: 10,
//         width: 10,
//         borderRadius: 5,
//         backgroundColor: color,
//         marginRight: 10,
//       }}
//     />
//   );

//   const renderLegendComponent = () => (
//     <View style={{ marginTop: 20 }}>
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "center",
//           marginBottom: 10,
//         }}
//       >
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             width: 120,
//             marginRight: 20,
//           }}
//         >
//           {renderDot("#006DFF")}
//           <Text style={{ color: "#1F2937" }}>Excellent: 47%</Text>
//         </View>
//         <View
//           style={{ flexDirection: "row", alignItems: "center", width: 120 }}
//         >
//           {renderDot("#8F80F3")}
//           <Text style={{ color: "#1F2937" }}>Okay: 16%</Text>
//         </View>
//       </View>
//       <View style={{ flexDirection: "row", justifyContent: "center" }}>
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             width: 120,
//             marginRight: 20,
//           }}
//         >
//           {renderDot("#3BE9DE")}
//           <Text style={{ color: "#1F2937" }}>Good: 40%</Text>
//         </View>
//         <View
//           style={{ flexDirection: "row", alignItems: "center", width: 120 }}
//         >
//           {renderDot("#FF7F97")}
//           <Text style={{ color: "#1F2937" }}>Poor: 3%</Text>
//         </View>
//       </View>
//     </View>
//   );

//   return (
//     <CardContainer title="Donut Chart">
//       <View style={{ alignItems: "center", justifyContent: "center" }}>
//         <PieChart
//           data={pieData}
//           donut
//           showGradient
//           sectionAutoFocus
//           radius={90}
//           innerRadius={60}
//           innerCircleColor={"#232B5D"}
//           centerLabelComponent={() => (
//             <View style={{ justifyContent: "center", alignItems: "center" }}>
//               <Text
//                 style={{ fontSize: 22, color: "white", fontWeight: "bold" }}
//               >
//                 47%
//               </Text>
//               <Text style={{ fontSize: 14, color: "white" }}>Excellent</Text>
//             </View>
//           )}
//         />
//       </View>
//       {renderLegendComponent()}
//     </CardContainer>
//   );
// };

// export default CustomDonutChart;
