// Chakra imports
import {
  Box,
  Flex,
  Text,
  Icon,
  useColorModeValue,
  Checkbox,
} from "@chakra-ui/react";
// Custom components
import Menu from "./MainMenu";
import IconBox from "components/icons/IconBox";

// Assets
import { MdCheckBox, MdDragIndicator } from "react-icons/md";
import React from "react";

export default function Conversion(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const boxColor = useColorModeValue("white !important", "#111C44 !important")
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "navy.700");
  const brandColor = useColorModeValue("brand.500", "brand.400");
  return (
    <Box
      bg={boxColor}
      borderRadius="25px"
      p="15px"
      mb="20px">
      <Flex alignItems='center' w='100%' mb='30px'>
        <IconBox
          me='12px'
          w='38px'
          h='38px'
          bg={boxBg}
          icon={<Icon as={MdCheckBox} color={brandColor} w='24px' h='24px' />}
        />

        <Text color={textColor} fontSize='lg' fontWeight='700'>
          Tasks
        </Text>
        <Menu ms='auto' />
      </Flex>
      <Box px='11px'>
        <Flex mb='20px'>
          <Checkbox me='16px' colorScheme='brandScheme' />
          <Text
            fontWeight='bold'
            color={textColor}
            fontSize='md'
            textAlign='start'>
            Lorem ipsum
          </Text>
          <Icon
            ms='auto'
            as={MdDragIndicator}
            color='secondaryGray.600'
            w='24px'
            h='24px'
          />
        </Flex>
        <Flex mb='20px'>
          <Checkbox me='16px' defaultChecked colorScheme='brandScheme' />
          <Text
            fontWeight='bold'
            color={textColor}
            fontSize='md'
            textAlign='start'>
            Dolor sit
          </Text>
          <Icon
            ms='auto'
            as={MdDragIndicator}
            color='secondaryGray.600'
            w='24px'
            h='24px'
          />
        </Flex>
        <Flex mb='20px'>
          <Checkbox defaultChecked me='16px' colorScheme='brandScheme' />
          <Text
            fontWeight='bold'
            color={textColor}
            fontSize='md'
            textAlign='start'>
            Amet consectetur
          </Text>
          <Icon
            ms='auto'
            as={MdDragIndicator}
            color='secondaryGray.600'
            w='24px'
            h='24px'
          />
        </Flex>
        <Flex mb='20px'>
          <Checkbox me='16px' colorScheme='brandScheme' />
          <Text
            fontWeight='bold'
            color={textColor}
            fontSize='md'
            textAlign='start'>
            Adipiscing elit
          </Text>
          <Icon
            ms='auto'
            as={MdDragIndicator}
            color='secondaryGray.600'
            w='24px'
            h='24px'
          />
        </Flex>
        <Flex mb='20px'>
          <Checkbox defaultChecked me='16px' colorScheme='brandScheme' />
          <Text
            fontWeight='bold'
            color={textColor}
            fontSize='md'
            textAlign='start'>
            Maecenas at
          </Text>
          <Icon
            ms='auto'
            as={MdDragIndicator}
            color='secondaryGray.600'
            w='24px'
            h='24px'
          />
        </Flex>
      </Box>
    </Box>
  );
}
