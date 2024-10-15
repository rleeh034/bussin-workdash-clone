// Chakra imports
import { Flex, Text, useColorModeValue, Box} from "@chakra-ui/react";
// Custom components
import SwitchField from "./SwitchField";
import Menu from "./MainMenu";

export default function Notifications(props) {
  const { ...rest } = props;
  // Chakra Color Mode
  const boxColor = useColorModeValue("white !important", "#111C44 !important")
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  return (
    <Box
      bg={boxColor}
      borderRadius="25px"
      p="15px"
      mb="20px">
      <Flex align="center" w="100%" justify="space-between" mb="30px">
        <Text
          color={textColorPrimary}
          fontWeight="700"
          fontSize="lg"
          mb="4px"
        >
          Notifications
        </Text>
        <Menu />
      </Flex>
      <SwitchField
        reversed={true}
        fontSize="sm"
        mb="20px"
        id="6"
        label="Company News"
      />
      <SwitchField
        isChecked={true}
        reversed={true}
        fontSize="sm"
        mb="20px"
        id="7"
        label="New Projects"
      />
      <SwitchField
        isChecked={true}
        reversed={true}
        fontSize="sm"
        mb="20px"
        id="1"
        label="New Products"
      />
      <SwitchField
        isChecked={true}
        reversed={true}
        fontSize="sm"
        mb="20px"
        id="4"
        label="Updated Products"
      />
      <SwitchField
        reversed={true}
        fontSize="sm"
        mb="20px"
        id="5"
        label="Upcoming Event"
      />
    </Box>
  );
}
