// Chakra imports
import { Flex } from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";
import FixedPlugin from "components/fixedPlugin/FixedPlugin";

function AuthIllustration(props) {
  const { children } = props;
  // Chakra color mode
  return (
    <Flex position='relative' h='max-content'>
      <Flex
        h={{
          sm: "initial",
          md: "unset",
          lg: "100vh",
          xl: "97vh",
        }}
        w='100%'
        maxW={{ base: "100%", md: "max-content" }}
        mx='auto'
        pt={{ sm: "50px", md: "0px" }}
        justifyContent='start'
        alignItems='center'
        direction='column'><h1></h1>
        {children}
      </Flex>
      <FixedPlugin />
    </Flex>
  );
}
// PROPS

AuthIllustration.propTypes = {
  illustrationBackground: PropTypes.string,
  image: PropTypes.any,
};

export default AuthIllustration;
