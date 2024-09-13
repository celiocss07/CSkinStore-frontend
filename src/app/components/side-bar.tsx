"use client"
import React, { useRef, useState } from 'react'
import { Box, Button, HStack, Input, Radio, RadioGroup, Select, Stack, Text, VStack } from "@chakra-ui/react";
import { } from '@chakra-ui/react'
import { SearchIcon } from 'lucide-react';


interface Props {
    onSubmit: (params: string) => void
}

export default function SideBar({ onSubmit }: Props) {

    const [sort, setSort] = useState<string>("price");

    const priceMinInputRef = useRef<HTMLInputElement>(null);
    const priceMaxInputRef = useRef<HTMLInputElement>(null);
    const floatMinInputRef = useRef<HTMLInputElement>(null);
    const floatMaxInputRef = useRef<HTMLInputElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);

    async function handleSubmit() {

        const data = `
       ${searchInputRef?.current?.value ? 'name=' + searchInputRef?.current?.value : ''}
       ${priceMinInputRef?.current?.value ? 'priceMin=' + priceMinInputRef?.current?.value : ''}
       ${priceMaxInputRef?.current?.value ? '&priceMax=' + priceMaxInputRef?.current?.value : ''}
       ${floatMinInputRef?.current?.value ? '&floatMin=' + floatMinInputRef?.current?.value : ''}
       ${floatMaxInputRef?.current?.value ? '&floatMax=' + floatMaxInputRef?.current?.value : ''}
       ${categoryRef?.current?.value ? '&category=' + categoryRef?.current?.value : ''}
       ${sort ? '&sortBy=' + sort : ''}
        `
        onSubmit(data.trim())

    }

    return (
        < Box
            
            display={{ base: 'none', md: 'block' }}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
        >
            <Text fontSize="xl" mb={4}>Filtros</Text>
            <HStack spacing={0}>
                <Input ref={searchInputRef} id="searchInput" placeholder='Pesquisar...' type="search" />
            </HStack>

            <Text fontSize="medium" mt={6} mb={1}>Preço</Text>
            <HStack spacing={2}>
                <Input ref={priceMinInputRef} id="priceMinInput" placeholder='min' type="number" />
                -
                <Input ref={priceMaxInputRef} id="priceMaxInput" placeholder='max' type="number" />

            </HStack>

            <Text fontSize="medium" mt={6} mb={1}>Float</Text>
            <HStack spacing={2}>
                <Input ref={floatMinInputRef} id="floatMinInput" placeholder='min' type="number" />
                -
                <Input ref={floatMaxInputRef} id="floatMaxInput" placeholder='max' type="number" />

            </HStack>

            <Text fontSize="medium" mt={6} mb={1}>Categoria</Text>
            <VStack spacing={2}>
                <Select ref={categoryRef} placeholder='Selecionar categoria' id="category">
                    <option value='Faca'>Faca</option>
                    <option value='Pistola'>Pistola</option>
                    <option value='Roupa'>Roupa</option>
                </Select>
            </VStack>

            <Text fontSize="medium" mt={6} mb={1}>Ordenar por:</Text>
            <RadioGroup value={sort} onChange={setSort}>
                <Stack direction='row'>
                    <Radio value='price'>Preço</Radio>
                    <Radio value='float'>Float</Radio>

                </Stack>
            </RadioGroup>

            <Button onClick={handleSubmit} colorScheme='teal' mt={8} variant='solid' className="w-full flex gap-2 justify-center items-center" >
                Pesquisar  <SearchIcon size={16} />
            </Button>

        </Box >
    )
}
