import React, { useState } from "react";
import { Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, Button, useColorModeValue } from "@chakra-ui/react";

const EditUserForm = ({ isOpen, onClose, onSave, onFormSave, currentName, currentEmail }) => {
  // Chakra Color Mode
  const boxColor = useColorModeValue("white !important", "#111C44 !important");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [newName, setNewName] = useState(currentName);
  const [newEmail, setNewEmail] = useState(currentEmail); // Add state for email

  const handleSave = () => {
    onSave(newName, newEmail); // Pass both newName and newEmail to the onSave callback
    onFormSave(newName, newEmail); // Pass both newName and newEmail to the onFormSave callback
    onClose();
  };

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="20px" bg={boxColor}>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>New Name</FormLabel>
              <Input type="text" color={textColor} value={newName} onChange={(e) => setNewName(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>New Email</FormLabel>
              <Input type="text" color={textColor} value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" fontSize="sm" variant="brand" fontWeight="500" w="100%" h="50" onClick={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EditUserForm;
