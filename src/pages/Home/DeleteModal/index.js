import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Text,
  Button
} from '@chakra-ui/react'
import api from '../../../services/api'

const DeleteModal = (props) => {

  const [loading, setLoading] = useState(false)

  const confirmDelete = () => {
    setLoading(true)

    api.delete(`/posts/${props.postId}`)
      .then(() => {
        props.loadPosts()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
        props.onClose()
      })
  }

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody pb='6'>
          <Text textAlign='center' fontSize='30px' >
            <b>Deseja realmente excluir este post?</b>
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme='red'
            mr='3'
            width='70%'
            onClick={confirmDelete}
            isLoading={loading}
          >Excluir</Button>
          <Button
            onClick={props.onClose}
            width='30%'
          >
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeleteModal