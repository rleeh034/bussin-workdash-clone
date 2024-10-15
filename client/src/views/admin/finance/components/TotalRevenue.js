import React from "react";
import moment from "moment/moment"

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// Icons
import {
  MdDownload,
  MdOutlineCalendarToday 
} from "react-icons/md";

// Component
import LineChart from "./LineChart";
import TableButton from "components/button/TableButton";

// Assets
import { RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri";

import {
  lineChartOptionsSaleChart,
} from "../variables/charts";

export default function TotalSpent(props) {
  const { onExportClick, data } = props;
  const totalRevenue = Math.max(...data[0].data)
  const changeInRevenue = ((totalRevenue-5000)/50).toFixed(2)
  // Chakra Color Mode
  const boxColor = useColorModeValue("white !important", "#111C44 !important")
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const iconColor = useColorModeValue("brand.500", "white");

  return (
    <Box
      bg={boxColor}
      borderRadius="25px"
      h="43vh"
      w="auto"
      p="10px">
      <Flex justify='space-between' ps='10px' pe='20px' pt='5px'>
        <Button
          bg={boxBg}
          fontSize='sm'
          fontWeight='500'
          color={textColorSecondary}
          borderRadius='7px'>
          <Icon
            as={MdOutlineCalendarToday}
            color={textColorSecondary}
            me='4px'
          />
          {moment().format('MMMM YYYY')}
        </Button>
        <TableButton 
          icon={MdDownload} 
          iconColor={iconColor}
          onClick={onExportClick}/>
      </Flex>
      <Flex h='85%' w='100%' ps='10px' flexDirection={{ base: "column", lg: "row" }} >
        <Flex flexDirection='column' me='10px' mt='28px'>
          <Text
            color='secondaryGray.600'
            fontSize='sm'
            fontWeight='500'
            mb='10px'>
            Total Revenue
          </Text>
          <Text
            color={textColor}
            fontSize='34px'
            textAlign='start'
            fontWeight='700'
            lineHeight='100%'>
            ${totalRevenue}
          </Text>
          {changeInRevenue >= 0 ? (
          <Flex align='center' mt='10px'>
            <Icon as={RiArrowUpSFill} color='green.500' mt='2px' />
            <Text color='green.500' fontSize='lg' fontWeight='700'>
              {changeInRevenue}%
            </Text>
          </Flex>) : (
          <Flex align='center' mt='10px'>
          <Icon as={RiArrowDownSFill} color='red.500' mt='2px' />
          <Text color='red.500' fontSize='lg' fontWeight='700'>
            {changeInRevenue}%
          </Text>
        </Flex>)}
        </Flex>
        <Box minH='90%' minW='85%'>
          <LineChart
            chartData={data}
            chartOptions={lineChartOptionsSaleChart}
          />
        </Box>
      </Flex>
    </Box>
  );
}
