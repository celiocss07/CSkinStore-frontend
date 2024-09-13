import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure, useToast } from "@chakra-ui/react"
import React, { FormEvent, useRef } from "react"
import { api } from "../../utils/axios"

interface Props {
    onSuccess: () => void
}
export default function CreateSkinModal({ onSuccess }: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast({position:"top"});

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const imageInputRef = useRef<HTMLInputElement>(null);
    const priceInputRef = useRef<HTMLInputElement>(null);
    const floatInputRef = useRef<HTMLInputElement>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);


    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        toast({
            title: "Processando...",
            description: "Cadastrando skin",
            status: "loading"
        })
        const data = {
            name: nameInputRef.current?.value,
            price: +(priceInputRef.current?.value || 0),
            float: floatInputRef.current?.value || "",
            image: imageInputRef.current?.value,
            category: categoryRef?.current?.value
        }
        console.log("DATA => ", data)

        try {
            await api.post('/items', data)

            onSuccess();
            onClose();
            toast.closeAll();
            toast({
                title: "Concluído",
                description: "Skin cadastrada com sucesso!",
                status: "success"
            })

        } catch (error) {
            console.log(error)
            toast.closeAll();
            toast({
                title: "Erro",
                description: "Erro ao cadastrar skin!",
                status: "error"
            })
        }

    }

    return (
        <>
            <Button onClick={onOpen} bgColor='green.500' color='white'>Cadastrar</Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />

                <ModalContent>
                    <ModalHeader>Create your account</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit}>
                        <ModalBody pb={6}>

                            <FormControl>
                                <FormLabel>Nome</FormLabel>
                                <Input required ref={nameInputRef} placeholder='Nome da skin' />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Imagem</FormLabel>
                                <Input required ref={imageInputRef} type='url' placeholder='EX: https://site.com/image.png' />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Preco</FormLabel>
                                <Input required ref={priceInputRef} type="number" placeholder='EX: 1200' />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Float</FormLabel>
                                <Input ref={floatInputRef} placeholder='EX: 1.0' />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Categoria</FormLabel>
                                <Select required ref={categoryRef} placeholder='Selecionar categoria' id="category">
                                    <option value='Faca'>Faca</option>
                                    <option value='Pistola'>Pistola</option>
                                    <option value='Roupa'>Roupa</option>
                                </Select>
                            </FormControl>

                        </ModalBody>

                        <ModalFooter>
                            <Button type="submit" colorScheme='green' mr={3}>
                                Salvar
                            </Button>
                            <Button onClick={onClose}>Cancelar</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal >
        </>
    )
}