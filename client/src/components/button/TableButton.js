import React from "react";

// Chakra imports
import { Icon, Button, useColorModeValue } from "@chakra-ui/react";

import PropTypes from "prop-types";

export default function TableButton(props) {
  const { icon, iconColor, ...rest } = props;
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue({ bg: "secondaryGray.400" }, { bg: "whiteAlpha.50" });
  const bgFocus = useColorModeValue({ bg: "secondaryGray.300" }, { bg: "whiteAlpha.100" });

  return (
    <Button align="center" justifyContent="center" bg={bgButton} _hover={bgHover} _focus={bgFocus} _active={bgFocus} w="37px" h="37px" lineHeight="100%" borderRadius="10px" {...rest}>
      <Icon as={icon} color={iconColor} w="24px" h="24px" />
    </Button>
  );
}

TableButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  iconColor: PropTypes.string.isRequired,
};
