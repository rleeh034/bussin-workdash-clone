// Chakra imports
import { Avatar, Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

export default function Banner(props) {
  const { banner, avatar, name, job } = props;
  // Chakra Color Mode
  const boxColor = useColorModeValue("white !important", "#111C44 !important")
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );
  return (
    <Box
      bg={boxColor}
      borderRadius="25px"
      p="15px"
      mb="20px">
      <Box
        bg={`url(${banner})`}
        bgSize='cover'
        borderRadius='16px'
        h='131px'
        w='100%'
      />
      <Flex direction='column' align='center'>
        <Avatar
          mx='auto'
          src={avatar}
          h='87px'
          w='87px'
          mt='-43px'
          border='4px solid'
          borderColor={borderColor}
        />
        <Text color={textColorPrimary} fontWeight='bold' fontSize='xl' mt='10px'>
          {name}
        </Text>
        <Text color={textColorSecondary} fontSize='sm'>
          {job}
        </Text>
        <Text color={textColorSecondary} fontSize='sm' mt='10px'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at felis at orci pharetra suscipit sed sit amet est. Ut.
        </Text>
      </Flex>
    </Box>
  );
}
