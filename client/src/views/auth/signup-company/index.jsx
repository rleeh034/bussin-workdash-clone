import React from "react";
import { Redirect, useHistory } from "react-router-dom";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

// Hooks
import { useSignup } from "hooks/account/useSignup"
import { useSignupCompany } from "hooks/company/useSignupCompany"

function Signup() {
  // Chakra color mode
  const boxColor = useColorModeValue("white !important", "#111C44 !important");
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const history = useHistory();
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [name, setText] = React.useState('')
  const {signup, error, isSuccess} = useSignup()
  const {signupCompany, isSuccessCompany, errorCompany} = useSignupCompany()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await Promise.all([signup(email, password, name, "OM", name), signupCompany(name)])
  }

  if (isSuccess && isSuccessCompany) return <Redirect to="/" />
  
  return (
    <Box 
    pt={{ base: "130px", md: "80px", xl: "80px" }}
    maxW={{ base: "100%", md: "max-content" }}
    mx='auto'>
      <Box 
        bg={boxColor}
        borderRadius="25px"
        p="20px">
        <Flex
          maxW={{ base: "100%", md: "max-content" }}
          w='100%'
          mx={{ base: "auto", lg: "0px" }}
          me='auto'
          h='100%'
          alignItems='center'
          justifyContent='center'
          mb={{ base: "20px", md: "10px" }}
          px={{ base: "25px", md: "0px" }}
          mt={{ base: "20px", md: "10px" }}
          flexDirection='column'>
          <Box me='auto'>
            <Heading color={textColor} fontSize='36px' mb='10px'>
              Create Company Account
            </Heading>
            <Text
              mb='36px'
              ms='4px'
              color={textColorSecondary}
              fontWeight='400'
              fontSize='md'>
              Enter account details
            </Text>
          </Box>
          <Flex
            zIndex='2'
            direction='column'
            w={{ base: "100%", md: "420px" }}
            maxW='100%'
            background='transparent'
            borderRadius='15px'
            mx={{ base: "auto", lg: "unset" }}
            me='auto'
            mb={{ base: "20px", md: "auto" }}>
            <FormControl>
              <FormLabel
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'>
                Company Name<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                type='name'
                placeholder='ABC Pte Ltd'
                mb='24px'
                fontWeight='500'
                size='lg'
                onChange={(e) => setText(e.target.value)} 
                value={name} 
              />
              <FormLabel
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'>
                Email<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                type='email'
                placeholder='mail@simmmple.com'
                mb='24px'
                fontWeight='500'
                size='lg'
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
              />
              <FormLabel
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                display='flex'>
                Password<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size='md'>
                <Input
                  isRequired={true}
                  fontSize='sm'
                  placeholder='Min. 8 characters'
                  mb='12px'
                  size='lg'
                  type={show ? "text" : "password"}
                  variant='auth'
                  onChange={(e) => setPassword(e.target.value)} 
                  value={password} 
                />
                <InputRightElement display='flex' alignItems='center' mt='4px'>
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick}
                  />
                </InputRightElement>
              </InputGroup>
              <Box mb='9px'>
                <Text color='red'>
                  {error}
                  {/* {errorCompany} */}
                </Text>
              </Box>
              <Button
                type='submit'
                fontSize='sm'
                variant='brand'
                fontWeight='500'
                w='100%'
                h='50'
                onClick={handleSubmit}>
                Sign Up
              </Button>
            </FormControl>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}

export default Signup;
