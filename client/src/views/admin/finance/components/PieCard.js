// Chakra imports
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import PieChart from "./PieChart";
import { pieChartOptions } from "../variables/charts";
import React from "react";

export default function SalePieChart(props) {
  const { label, data } = props;

  // Chakra Color Mode
  const boxColor = useColorModeValue("white !important", "#111C44 !important")
  const textColor = useColorModeValue("navy.700", "white");

  pieChartOptions.labels = label

  return (
    <Box
      bg={boxColor}
      borderRadius="25px"
      h="40vh"
      w="55vh"
      p="10px">
      <Flex
        px={{ base: "0px", "2xl": "10px" }}
        justifyContent='space-between'
        alignItems='center'
        w='100%'
        mb='15px'>
        <Text color={textColor} fontSize='xl' fontWeight='600' mt='4px'>
          Total Product Sale
        </Text>
      </Flex>
      {data.length > 0 && (
      <PieChart
        chartData={data}
        chartOptions={pieChartOptions}
      />)}
    </Box>
  );
}
