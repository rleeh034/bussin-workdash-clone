import React from "react";
import { Redirect } from "react-router-dom";

// Chakra imports
import {
  Select,
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
import { useAuthContext } from 'hooks/account/useAuthContext'

function Signup() {
  // Chakra Color Mode
  const boxColor = useColorModeValue("white !important", "#111C44 !important");
  const textColor = useColorModeValue("navy.700", "white");
  const optionColor = useColorModeValue("black", "white");
  const textColorSecondary = "gray.400";
  const brandStars = useColorModeValue("brand.500", "brand.400");
  // user of OM creating the account for employee
	const { user } = useAuthContext()
  const company = !(user.userDetail.role === "Dev") ? user.userDetail.company : "test"
  // Chakra Color Mode

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [name, setText] = React.useState('')
  const [role, setSelectedValue] = React.useState('');

  const {signup, error, isSuccess} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(email, password, name, role, company)
  }

  if (isSuccess) return <Redirect to="/" />
  
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
          mb={{ base: "25px", md: "10px" }}
          px={{ base: "25px", md: "0px" }}
          mt={{ base: "25px", md: "10px" }}
          flexDirection='column'>
          <Box me='auto'>
            <Heading color={textColor} fontSize='36px' mb='10px'>
              Create User Account
            </Heading>
            <Text
              mb='36px'
              ms='4px'
              color={textColorSecondary}
              fontWeight='400'
              fontSize='md'>
              Enter employee details
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
                Employee Name<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                type='name'
                placeholder='John Doe'
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
                Employee Role<Text color={brandStars}>*</Text>
              </FormLabel>
              <Select
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                mb='24px'
                fontWeight='500'
                size='lg'
                onChange={(e) => setSelectedValue(e.target.value)}
                value={role}>
                <option style={{color:optionColor}}></option>
                <option style={{color:optionColor}} value='Basic'>Basic</option>
                <option style={{color:optionColor}} value='Analyst'>Analyst</option>
                <option style={{color:optionColor}} value='OM'>Operation Manager</option>
              </Select>
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
                Create
              </Button>
            </FormControl>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}

export default Signup;
