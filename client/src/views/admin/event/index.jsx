// Chakra imports
import {
  Box,
  SimpleGrid,
  Text,
  List,
  ListItem,
  useColorModeValue,
  Center
} from "@chakra-ui/react"
import React, { useState, useEffect } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import moment from "moment/moment"

import "assets/css/EventCalendar.css"

// Modals
import CreateEventModal from './components/CreateEventModal'
import UpdateEventModal from './components/UpdateEventModal'

// Hooks
import { useGetEvents } from "hooks/event/useGetEvents"
import { useAuthContext } from "hooks/account/useAuthContext"

export default function UserReports() {
  // Chakra Color Mode
  const boxColor = useColorModeValue("white !important", "#111C44 !important")

  const { user } = useAuthContext()
  const { get } = useGetEvents()
  
  const [isDataFetched, setIsDataFetched] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [allEvents, setAllEvents] = useState([])
  const [futureEvents, setFutureEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)

  const getUserEvents = async (e) => {
    const data = await get(user.userDetail._id)

    const allEventsMap = data.map((event) => ({
      id: event._id,
      title: event.name,
      start: event.start,
      end: event.end,
      editable: false
    }))

    const futureEventsMap = allEventsMap.filter((event) => {
      const currentDate = moment().utc().format()
      return event.start > currentDate
    })

    setAllEvents(allEventsMap)
    setFutureEvents(futureEventsMap) 
    setIsDataFetched(true)
  }

  const handleDateClick = (selected) => {
    setSelectedDate(selected)
    setIsCreateModalOpen(true)
  }

  const handleEventClick = (info) => {
    const { event } = info
    setSelectedEvent(event)
    setIsUpdateModalOpen(true)
  }

  useEffect(() => {
    if (!isDataFetched) {
      getUserEvents()
    }
  }, [isDataFetched])

  if (!isDataFetched) {
    return (
      <Center height="100vh">
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        bg={boxColor}
        p="3"
        boxShadow="base">
        Loading...
      </Box>
    </Center>
    )
  }
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px' templateColumns='1fr 5fr'>
        <Box
          bg={boxColor}
          borderRadius="25px"
          overflowY="auto"
          h="85vh">
          <Text p="15px 15px 5px 15px" fontSize="19px" fontWeight="700">Upcoming Events</Text>
          <SimpleGrid gap='10px' mb='20px' templateRow='1fr'>
              <List>
              {futureEvents.map((event) => (
                <ListItem bg="royalblue" color="white" fontSize="11pt" m="10px" p="5px" borderRadius="5px">
                  <Text fontWeight="bold">{event.title}</Text> 
                  <Text> Start: {moment(event.start).format("DD/MM/YYYY h:mm A")}</Text> 
                  <Text> End: {moment(event.end).format("DD/MM/YYYY h:mm A")}</Text> 
                </ListItem>
              ))}
              </List>
          </SimpleGrid>
         </Box>
        <Box bg={boxColor} borderRadius="25px" h="85vh" w="100%" p="20px" style={{ zIndex: 0 }}>
          <FullCalendar
              height="75vh"
              plugins={[
                  dayGridPlugin,
                  timeGridPlugin,
                  interactionPlugin,
              ]}
              headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              select={handleDateClick}
              eventClick={handleEventClick}
              events={allEvents}
              views={{
                dayGridMonth: {
                  allDaySlot: false, // Remove all-day slot in month view
                },
                timeGridWeek: {
                  allDaySlot: false, // Remove all-day slot in week view
                },
                timeGridDay: {
                  allDaySlot: false, // Remove all-day slot in day view
                },
              }}
          />
        </Box>
      </SimpleGrid>
      {selectedDate && isCreateModalOpen && (
      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        getOnSuccess={() => setIsDataFetched(false)}
        selectedDate = {selectedDate}/>
      )}
      {selectedEvent && isUpdateModalOpen &&(
      <UpdateEventModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        getOnSuccess={() => setIsDataFetched(false)}
        selectedEvent = {selectedEvent}/>
      )}
    </Box>
  )
}
