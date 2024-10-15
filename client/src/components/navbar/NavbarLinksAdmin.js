// Chakra Imports
import {
	Avatar,
	Flex,
	Icon,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
  Button,
  Box,
	useColorModeValue,
  useColorMode,
} from '@chakra-ui/react';
// Custom Components
import { ItemContent } from 'components/menu/ItemContent';
import { SidebarResponsive } from 'components/sidebar/Sidebar';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from "react";
import axios from 'axios';

// Assets
import { MdNotificationsNone } from 'react-icons/md';
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import routes from 'routes.js';

// Hooks
import { useLogout } from "hooks/account/useLogout"
import { useAuthContext } from 'hooks/account/useAuthContext'



export default function HeaderLinks(props) {
	// Chakra Color Mode
	const navbarIcon = useColorModeValue('gray.400', 'white');
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorBrand = useColorModeValue('brand.700', 'brand.400');
	const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
	const shadow = useColorModeValue(
		'14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
		'14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
	);
  let menuBg = useColorModeValue('white', 'navy.800');
	const { secondary } = props;
	const { logout } = useLogout();
  const { user } = useAuthContext();
  const { colorMode, toggleColorMode } = useColorMode();
  const [events, setEvents] = useState([]);

  let userRole;
  switch(user.userDetail.role) {
    case "Dev": 
      userRole = "Developer" 
      break;
    case "OM": 
      userRole = "Operation Manager"       
      break;
    case "Analyst": 
      userRole = "Finance Analyst"
      break;
    default: userRole = "Employee"
  }

	const handleClick = () => {
	  logout();
	};

   useEffect(() => {
    const fetchEvents = async () => {
      try {
        const currentDateTime = new Date();
        const response = await axios.get(`/api/event?id=${user.userDetail._id}`);
        const filteredEvents = response.data.filter((event) => new Date(event.start) >= currentDateTime);
        setEvents(filteredEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
       fetchEvents();
  }, [user.userDetail._id])


  const DateTimeFormatting = (dateTimeString)=>{
  
  // Parse the date-time string into a JavaScript Date object
  const date = new Date(dateTimeString);

  // Define a custom date-time format
  const options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // Use 12-hour format
  };

  const formattedDateTime = new Intl.DateTimeFormat('en-US', options).format(date);
  return (formattedDateTime);
}

	return (
    <Flex
      w={{ sm: '100%', md: 'auto' }}
      alignItems="center"
      flexDirection="row"
      bg={menuBg}
      flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
      p="10px"
      borderRadius="30px"
      boxShadow={shadow}>
      <Text
        pl="20px"
        pr="10px"
        w="100%"
        fontSize="sm"
        fontWeight="700"
        color={textColor}>
        {userRole}
      </Text>
      <SidebarResponsive routes={routes} />
      <Menu>
        <MenuButton p="0px" borderRadius="10px" alignContent={"center"}>
        <Box position="relative" display="inline-block" mt="8px" mr='5px'> 
          <Icon as={MdNotificationsNone} color={navbarIcon} w="20px" h="20px" />
          {events.length > 0 && (
            <Box
              position="absolute"
              top="-5px"
              right="-5px"
              width="13px"
              height="13px"
              borderRadius="50%"
              backgroundColor="red"
              display="flex"
              justifyContent="center"
              alignItems="center"
              boxShadow={"0 0 5px red"}
            >
              <Text color="white" fontSize="10px">
                {events.length}
              </Text>
            </Box>
          )}
        </Box>
        </MenuButton>

        <MenuList
          boxShadow={shadow}
          p="20px"
          borderRadius="20px"
          bg={menuBg}
          border="none"
          mt="22px"
          me={{ base: '30px', md: 'unset' }}
          minW={{ base: 'unset', md: '400px', xl: '450px' }}
          maxW={{ base: '360px', md: 'unset' }}
        >
          <Flex justify="space-between" w="100%" mb="20px">
            <Text fontSize="md" fontWeight="600" color={textColor}>
              Notifications
            </Text>
          </Flex>
          <Flex flexDirection="column">
            {events.length > 0 && (
              <MenuItem>
                <Text fontWeight="bold">Upcoming Events</Text>
              </MenuItem>
            )}
            {events.length === 0 ? (
              <MenuItem>No Upcoming Events</MenuItem>
            ) : (
              events.map((event) => (
                <MenuItem key={event._id}>
                  <span style={{ fontWeight: 'bold' }}>{event.name}</span> &nbsp;-&nbsp;{' '}
                  <span style={{ fontStyle: 'italic' }}>{DateTimeFormatting(event.start)}</span>
                </MenuItem>
              ))
            )}
          </Flex>
        </MenuList>

      </Menu>
      <Button
        display='flex'
        align='center'
        justify='center'
        onClick={toggleColorMode}
        bg='transparent'>
        <Icon 
          color={navbarIcon} 
          as={colorMode === "light" ? IoMdMoon : IoMdSunny} 
          w="20px" 
          h="20px"/>
      </Button>
      <Menu>
        <MenuButton p="0px">
          <Avatar
            _hover={{ cursor: 'pointer' }}
            color="white"
            name={user.userDetail.name}
            bg="#11047A"
            size="sm"
            w="40px"
            h="40px"
          />
        </MenuButton>
        <MenuList boxShadow={shadow} p="0px" mt="10px" borderRadius="20px" bg={menuBg} border="none">
          <Flex w="100%" mb="0px">
            <Text
              ps="20px"
              pt="16px"
              pb="10px"
              w="100%"
              borderBottom="1px solid"
              borderColor={borderColor}
              fontSize="sm"
              fontWeight="700"
              color={textColor}>
              👋&nbsp; Hey, {user.userDetail.name}
            </Text>
          </Flex>
          <Flex flexDirection="column" p="10px">
            <MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} borderRadius="8px" px="14px">
              <Text fontSize="sm">Settings</Text>
            </MenuItem>
            <MenuItem
              _hover={{ bg: 'none' }}
              _focus={{ bg: 'none' }}
              color="red.400"
              borderRadius="8px"
              px="14px"
              onClick={handleClick}>
              <Text fontSize="sm">Log out</Text>
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
	);
}

HeaderLinks.propTypes = {
	variant: PropTypes.string,
	fixed: PropTypes.bool,
	secondary: PropTypes.bool,
	onOpen: PropTypes.func
};
