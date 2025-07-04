// import React from 'react';
// import { View, Text } from 'react-native';
// import { LineChart as GiftedLineChart } from 'react-native-gifted-charts';
// import { tw } from 'nativewind';

// interface LineChartProps {
//   data: { value: number; label?: string; }[];
//   height?: number;
//   width?: number;
//   lineColor?: string;
//   labelColor?: string;
//   showGrid?: boolean;
//   showAxis?: boolean;
//   style?: object;
// }

// const LineChart: React.FC<LineChartProps> = ({
//   data,
//   height = 200,
//   width = 320,
//   lineColor = '#4F46E5', // Indigo-600 Tailwind default color
//   labelColor = '#374151', // Gray-700
//   showGrid = true,
//   showAxis = true,
//   style = {},
// }) => {
//   return (
//     <View className=''>
//       <GiftedLineChart
//         data={data}
//         height={height}
//         width={width}
//         color={lineColor}
//         showVerticalLines={showGrid}
//         showHorizontalLines={showGrid}
//         yAxisThickness={showAxis ? 1 : 0}
//         xAxisThickness={showAxis ? 1 : 0}
//         yAxisTextStyle={{ color: labelColor, fontSize: 12 }}
//         xAxisTextStyle={{ color: labelColor, fontSize: 12 }}
//         initialSpacing={10}
//         spacing={40}
//         thickness={3}
//         curved
//         startFillColor={lineColor + '33'} // semi-transparent fill
//         endFillColor={lineColor + '00'} // transparent
//       />
//     </View>
//   );
// };

// export default LineChart;
