import React from "react";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  CloseButton,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import moment from "moment/moment";

// Hooks
import { useAuthContext } from "hooks/account/useAuthContext"
import { useUpdateEvent } from "hooks/event/useUpdateEvent"

function UpdateEventModal({ isOpen, onClose, getOnSuccess, selectedEvent }) {
  // Chakra Color Mode
  const boxColor = useColorModeValue("white !important", "#111C44 !important");
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const { user } = useAuthContext()
  const modalDisplay = isOpen ? "block" : "none";
  const [eventName, setEventName] = React.useState(selectedEvent.title)
  const [startDateTime, setStartDateTime] = React.useState(moment(selectedEvent.start).format("yyyy-MM-DD[T]HH:mm"))
  const [endDateTime, setEndDateTime] = React.useState(moment(selectedEvent.end).format("yyyy-MM-DD[T]HH:mm"))
  const {resetState, update, deleteEvent, isSuccess, error} = useUpdateEvent()

  const handleClose = () => {
    resetState()
    onClose()
  };

  const handleSuccess = () => {
    handleClose()
    getOnSuccess()
  };

  const handleUpdate = async (e) => {
    e.preventDefault()
    await update(selectedEvent.id, eventName, startDateTime, endDateTime, user.userDetail._id)
  };

  const handleDelete = async (e) => {
    e.preventDefault()
    await deleteEvent(selectedEvent.id)
  };

  if (!isOpen) return null
  if (isSuccess) return handleSuccess();

  return (
    <Box 
      className="modal" style={{ display: modalDisplay }}>
      <Box 
        className="modal-content"
        bg={boxColor}
        borderRadius="20px"
        p="20px">
        <Flex w="100%" mb="24px">
          <Heading fontSize="20px">
            Update Event
          </Heading>
          <CloseButton className="close" onClick={handleClose}/>
        </Flex>
        <Box me="auto">
          <FormControl>
            <FormLabel
              display="flex"
              fontSize="sm"
              fontWeight="500"
              mb="8px">
              Event Name
            </FormLabel>
            <Input
              isRequired={true}
              fontSize="sm"
              type="name"
              color={textColor}
              placeholder="Example"
              mb="24px"
              fontWeight="500"
              size="lg"
              onChange={(e) => setEventName(e.target.value)} 
              value={eventName}/>
            <FormLabel
              display="flex"
              fontSize="sm"
              fontWeight="500"
              mb="8px">
              Start Datetime
            </FormLabel>
            <Input
              isRequired={true}
              fontSize="sm"
              type="datetime-local"
              color={textColor}
              placeholder="Start"
              mb="24px"
              fontWeight="500"
              size="lg"
              onChange={(e) => setStartDateTime(e.target.value)}
              value={startDateTime}/>
            <FormLabel
              display="flex"
              fontSize="sm"
              fontWeight="500"
              mb="8px">
              End Datetime
            </FormLabel>
            <Input
              isRequired={true}
              fontSize="sm"
              type="datetime-local"
              color={textColor}
              placeholder="End"
              mb="24px"
              fontWeight="500"
              size="lg"
              onChange={(e) => setEndDateTime(e.target.value)}
              value={endDateTime}/>
          </FormControl>
          <Box mb="9px">
            <Text color="red">
              {error}
            </Text>
          </Box>
          <Button
            type="submit"
            name="update"
            fontSize="sm"
            variant="brand"
            fontWeight="500"
            w="100%"
            h="50"
            onClick={handleUpdate}>
            Update
          </Button>
          <Button 
              backgroundColor="#e32417"
              type="submit"
              name="delete"
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"                
              mt="10px"
              onMouseEnter={(e) => e.target.style.backgroundColor = "#ad2218"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#e32417"}
              onClick={handleDelete}>
              Delete
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default UpdateEventModal;