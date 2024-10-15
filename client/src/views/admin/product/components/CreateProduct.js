import React, { useState } from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
const CreateProductForm = ({
  isOpen,
  onClose,
  onSave,
  error
}) => {
  // Chakra Color Mode
  const boxColor = useColorModeValue("white !important", "#111C44 !important");
  const textColor = useColorModeValue("navy.700", "white");
  const [name, setName] = useState("");
  const [initialQuantity, setInitialQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleSave = () => {
    onSave(name, initialQuantity, price);
  };

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent      
          borderRadius="20px"
          bg={boxColor}>
          <ModalHeader>Create Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
            <FormLabel
                display="flex"
                fontSize="sm"
                fontWeight="500"
                mb="8px">
                  Product Name
              </FormLabel>
              <Input
                isRequired={true}
                fontSize="sm"
                type="text"
                color={textColor}
                placeholder="Example"
                mb="24px"
                fontWeight="500"
                size="lg"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <FormLabel
                display="flex"
                fontSize="sm"
                fontWeight="500"
                mb="8px">
                Quantity
              </FormLabel>
              <Input
                isRequired={true}
                fontSize="sm"
                type="number"
                color={textColor}
                placeholder="100"
                mb="24px"
                fontWeight="500"
                size="lg"
                onChange={(e) => setInitialQuantity(e.target.value)}
                value={initialQuantity}
              />
              <FormLabel
                display="flex"
                fontSize="sm"
                fontWeight="500"
                mb="8px">
                Price (in $)
              </FormLabel>
              <Input
                isRequired={true}
                fontSize="sm"
                type="number"
                color={textColor}
                placeholder="100"
                mb="10px"
                fontWeight="500"
                size="lg"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </FormControl>
            <Box>
              <Text color="red">
                {error}
              </Text>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
                type="submit"
                fontSize="sm"
                variant="brand"
                fontWeight="500"
                w="100%"
                h="50"
                onClick={handleSave}>
                Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CreateProductForm;
