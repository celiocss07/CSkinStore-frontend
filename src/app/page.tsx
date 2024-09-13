"use client"
import { } from "@chakra-ui/next-js";
import { Box, Button, Divider, Grid, HStack, Image, Text } from "@chakra-ui/react";


import { useEffect, useState } from "react";
import { formatPrice } from "./utils/utils";
import SideBar from "./components/side-bar";
import ProductsGridSkeleton from "./components/skeletons/skins-card-skeleton";
import { motion } from "framer-motion";
import { CSkinProps } from "./types/items";
import { api } from "./utils/axios";




const ItemList = () => {

  const MotionBox = motion(Box);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [items, setItems] = useState<CSkinProps[]>([]);

  async function handleSubmit(params?: string) {

    setIsLoading(true);

    try {
      const { data } = await api.get('http://localhost:3001/items?' + params)


      setItems(data);
      setIsLoading(false);

    } catch (error) {
      setIsLoading(false);
      console.log(error)
    }
  }

  useEffect(() => {
    handleSubmit()
  }, [])


  return (
    <Box p={4}>
      <Grid
        templateColumns={{ base: '1fr', md: '1fr 3fr' }} // 1 coluna em mobile, 2 colunas em md e acima
        gap={4}
      >
        <SideBar onSubmit={handleSubmit} />

        {/* Grid de Produtos */}

        {isLoading && (
          <ProductsGridSkeleton />
        )}

        {
          !isLoading && (
            <Grid
              templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} // 1 coluna no mobile, 2 colunas em sm, 4 colunas em lg
              gap={6}
            >
              {items?.map((item: CSkinProps) => (
                <MotionBox
                  key={item?.id}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  p={4}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }} // Tempo de transição
                >
                  <Image _hover={{ scale: 1.5 }} className="  object-contain object-center flex-1" src={item?.image || `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLr3lz8wkbzQMaQXkYBBMH4lC_YASMANBwJA&s`} alt="Product Image" />
                  <Box p={4}>
                    <Text fontWeight="bold">{item?.name}</Text>
                    <HStack>
                      <Text color="gray.600" size="small">Categoria:</Text>
                      <Text color="gray.800">{item?.category}</Text>
                    </HStack>

                    <HStack>
                      <Text color="gray.600">Float:</Text>
                      <Text color="gray.800">{item?.float}</Text>
                    </HStack>

                    <Text mt={2} colorScheme='teal' color="teal">{formatPrice(item?.price)}</Text>
                    <Divider mt={2} />
                    <Button colorScheme='teal' variant='outline' mt={2} size="sm" rounded={4} className="w-full">Comprar</Button>
                  </Box>
                </MotionBox>
              ))}
            </Grid>
          )
        }

      </Grid >
    </Box >
  );
};
export default ItemList;
