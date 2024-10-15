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
import { useCreateEvent } from "hooks/event/useCreateEvent"
import { useAuthContext } from "hooks/account/useAuthContext"

function CreateEventModal({ isOpen, onClose, getOnSuccess, selectedDate }) {
  // Chakra Color Mode
  const boxColor = useColorModeValue("white !important", "#111C44 !important");
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const modalDisplay = isOpen ? "block" : "none";
  const { user } = useAuthContext()
  const [eventName, setEventName] = React.useState("")
  const [startDateTime, setStartDateTime] = React.useState(moment(selectedDate.start).format("yyyy-MM-DD[T]HH:mm"))
  const [endDateTime, setEndDateTime] = React.useState(moment(selectedDate.end).subtract(1, 'minutes').format("yyyy-MM-DD[T]HH:mm"))
  const {create, resetState, error, isSuccess} = useCreateEvent()

  const handleClose = () => {
    resetState()
    onClose()
    setEventName("")
  };

  const handleSuccess = () => {
    handleClose()
    getOnSuccess()
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await create(eventName, startDateTime, endDateTime, user.userDetail._id)
  };

  if (!isOpen) return null;
  if (isSuccess) return handleSuccess();
  
  return (
    <Box 
      className="modal" style={{ display: modalDisplay }}>
      <Box 
        className="modal-content"
        bg={boxColor}
        borderRadius="20px"
        p="20px">
        <form onSubmit={handleSubmit}>
          <Flex w="100%" mb="24px">
            <Heading fontSize="20px">
              Create Event
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
                Start Time
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
                End Time
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
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50">
              Create
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default CreateEventModal;