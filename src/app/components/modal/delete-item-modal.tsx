import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Text,
    useToast,
} from '@chakra-ui/react'
import { Trash } from 'lucide-react'
import { api } from '../../utils/axios'

interface Props {
    skinId: string,
    onSuccess: () => void
}

export default function DeleteSkinModal({ onSuccess, skinId }: Props) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast({position:"top"});

    async function handleDeleteSkin() {

        toast({
            title: "Processando...",
            description: "Deletando skin",
            status: "loading"
        })

        try {
            await api.delete(`/items/${skinId}`)
            
            onSuccess();
            onClose();
            toast.closeAll();
            toast({
                title: "Concluído",
                description: "Skin deletada com sucesso!",
                status: "success"
            })

        } catch (error) {

            console.log(error);
            toast.closeAll();
            toast({
                title: "Erro",
                description: "Erro ao carregar skin's!",
                status: "error"
            })
        }

    }

    return (
        <>

            <Button onClick={onOpen} bg={"transparent"} p={1}>
                <Trash size={16} color='red' />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Deletar Skin</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <Text>Tem certeza que deseja deletar esta skin?</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button bg='red.500' color={"white"} mr={3} onClick={handleDeleteSkin}>
                            Deletar
                        </Button>
                        <Button >Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}