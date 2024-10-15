import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Select,
  useColorModeValue
} from "@chakra-ui/react";

// Hooks 
import { useAuthContext } from 'hooks/account/useAuthContext'

const CreateSaleForm = ({
  isOpen,
  onClose,
  onSave,
  onCreate,
  error
}) => {
  // Chakra Color Mode
  const boxColor = useColorModeValue("white !important", "#111C44 !important");
  const textColor = useColorModeValue("navy.700", "white");
  const optionColor = useColorModeValue("black", "white");

  // user
	const { user } = useAuthContext()
  const userCompany = user.userDetail.company
  const [ProductData, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [quantity, setQuantity] = useState("");

  const handleSave = () => {
    onSave(selectedProduct.name, quantity, selectedProduct._id);
    onCreate()
  };

  useEffect(() => {
    // Make a GET request to your backend API to fetch data
    axios
      .get(`/api/finance/product?company_name=${userCompany}`)
      .then((response) => {
        setProducts(response.data.Product);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userCompany]);

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent      
          borderRadius="20px"
          bg={boxColor}>
          <ModalHeader>Create Sale</ModalHeader>
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
              <Select
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                mb='24px'
                fontWeight='500'
                size='lg'
                onChange={(e) => setSelectedProduct(ProductData[e.target.value])}>
                <option style={{color:optionColor}}></option>
                {ProductData.map((product, index) => (
                  <option style={{color:optionColor}} key={index} value={index}>{product.name}</option>
                ))}
              </Select>
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
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
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

export default CreateSaleForm;
