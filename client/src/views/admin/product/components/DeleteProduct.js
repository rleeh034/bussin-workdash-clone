import React from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  useColorModeValue
} from "@chakra-ui/react";

const DeleteProductForm = ({
  isOpen,
  onClose,
  onSave,
  currentName
}) => {
  // Chakra Color Mode
  const boxColor = useColorModeValue("white !important", "#111C44 !important");

  const handleSave = () => {
    onSave();
    onClose();
  };

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent      
          borderRadius="20px"
          bg={boxColor}>
          <ModalHeader>Confirm delete {currentName}?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button 
              backgroundColor="#e32417"
              type="submit"
              name="delete"
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"   
              mb="10px"             
              onMouseEnter={(e) => e.target.style.backgroundColor = "#ad2218"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#e32417"}
              onClick={handleSave}>
              Delete
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DeleteProductForm;
