"use client"
import { HStack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useToast, VStack } from '@chakra-ui/react'

import React, { useEffect, useState } from 'react'
import { CSkinProps } from '../types/items';
import { formatPrice } from '../utils/utils';

import CreateSkinModal from '../components/modal/create-item-modal';
import { api } from '../utils/axios';
import DeleteSkinModal from '../components/modal/delete-item-modal';
import TableSkeleton from '../components/skeletons/table-skeleton';
import { motion } from 'framer-motion';

export default function Admin() {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [items, setItems] = useState<CSkinProps[]>([]);

    const MotionBox = motion(Table);
    const toast = useToast({ position: "top" });

    async function handleLoadSkins() {
        setIsLoading(true);

        try {
            const { data } = await api.get('/items')
            setItems(data);
            setIsLoading(false);

        } catch (error) {

            setIsLoading(false);
            console.log(error);
            toast.closeAll();
            toast({
                title: "Erro",
                description: "Erro ao carregar skin's!",
                status: "error"
            })
        }
    }




    useEffect(() => {
        handleLoadSkins()
    }, [])

    return (
        <VStack spacing={4} p={8} marginY={'auto'}>
            <HStack className='flex justify-end w-full'>
                <CreateSkinModal onSuccess={() => handleLoadSkins()} />
            </HStack>
            <TableContainer className=' h-[80svh] overflow-hidden overflow-y-scroll overflow-x-auto'>
                {
                    !isLoading && (
                        <MotionBox
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="hidden"
                            p={4}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }} // Tempo de transição
                            variant='striped' colorScheme='gray'
                        >
                            <TableCaption>Imperial to metric conversion factors</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Nome</Th>
                                    <Th>Categoria</Th>
                                    <Th isNumeric>Preço</Th>
                                    <Th isNumeric>Float</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>

                            <Tbody >
                                {
                                    items?.map(item => (
                                        <Tr key={item?.id}>
                                            <Td>{item?.name}</Td>
                                            <Td>{item?.category}</Td>
                                            <Td isNumeric>{formatPrice(item?.price)}</Td>
                                            <Td isNumeric>{item?.float}</Td>
                                            <Td >
                                                <DeleteSkinModal skinId={item?.id} onSuccess={() => handleLoadSkins()} />
                                            </Td>
                                        </Tr>
                                    ))
                                }

                            </Tbody>
                        </MotionBox>
                    )
                }

                {
                    isLoading && (<TableSkeleton />)
                }
            </TableContainer>
        </VStack>
    )
}
