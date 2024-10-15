import React, { useState } from "react";
import { Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, Button, useColorModeValue } from "@chakra-ui/react";

const EditCompanyForm = ({ isOpen, onClose, onSave, onFormSave, currentName }) => {
  // Chakra Color Mode
  const boxColor = useColorModeValue("white !important", "#111C44 !important");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [newName, setNewName] = useState(currentName);

  const handleSave = () => {
    onSave(newName);
    onFormSave(newName);
    onClose();
  };

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="20px" bg={boxColor}>
          <ModalHeader>Edit Company Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>New Name</FormLabel>
              <Input type="text" color={textColor} value={newName} onChange={(e) => setNewName(e.target.value)} />
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

export default EditCompanyForm;
