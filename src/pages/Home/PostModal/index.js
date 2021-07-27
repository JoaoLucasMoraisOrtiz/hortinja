/* 
  formato do novo post:
  {
    _id
    url
    title
    description
    averangePrice
    measurement

}
*/

import React, { useState, useEffect } from 'react'
import { 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Flex,
  Spinner
} from '@chakra-ui/react'
import api from '../../../services/api'

const PostModal = (props) => {

  const [authorId, setAuthorId] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')

  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(false)

  const cleanFields = () => {
    setTitle('')
    setAuthorId('')
    setDescription('')
    setUrl('')
  }

  const closeModal = () => {
    setLoading(false)
    cleanFields()
    props.onClose()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    if (props.postId) {
      api.patch(`/posts/${props.postId}`, {
        title,
        authorId,
        description,
        url
      })
        .then(() => {
          props.loadPosts()
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => closeModal())
    } else {
      api.post('/posts', {
        title,
        authorId,
        description,
        url
      })
        .then(() => {
          props.loadPosts()
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => closeModal())
    }
  }

  useEffect(() => {
    if (!props.postId) {
      cleanFields()
    }
  }, [props.postId])

  useEffect(() => {
    if (props.postId) {
      setLoadingData(true)

      const loadPost = async () => {
        const responsePost = await api.get(`/posts/${props.postId}`)

        setAuthorId(responsePost?.data?.authorId)
        setTitle(responsePost?.data?.title)
        setDescription(responsePost?.data?.description)
        setUrl(responsePost?.data?.url)
      }

      loadPost()
        .finally(() => {
          setLoadingData(false)
        })


    }
  }, [props.postId])

  useEffect(() => {
    const loadAuthors = async () => {
      const response = await api.get('/authors')
      setAuthors(response.data)
    }

    loadAuthors()
  }, [])

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign='center' >
          {props.postId ? 'Editar Post' : 'Novo Post'}
        </ModalHeader>
        <ModalCloseButton/>
        <form onSubmit={handleSubmit}>
          <ModalBody>
            {loadingData ? (
              <Flex justifyContent='center' marginY='10'>
                <Spinner color='green.500'/>
              </Flex>
            ) : (
              <>
                <FormControl>
                  <FormLabel>Autor</FormLabel>
                  <Select
                    placeholder='Selecione o autor'
                    id='author'
                    name='author'
                    value={authorId}
                    onChange={(e) => setAuthorId(e.target.value)}
                  >
                    {authors.map(author => (
                      <option
                        key={author?._id}
                        value={author?._id}
                      >
                        {`${author?.firstName} ${author?.lastName}`}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl mt='4'>
                  <FormLabel>Nome da Imagem</FormLabel>
                  <Input
                    placeholder='Nome descritivo da imagem'
                    id='title'
                    name='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormControl>
                <FormControl mt='4'>
                  <FormLabel>Url da Imagem</FormLabel>
                  <Input
                    placeholder='Link da sua imagem'
                    id='url'
                    name='url'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </FormControl>
                <FormControl mt='4'>
                  <FormLabel>Descrição da Imagem</FormLabel>
                  <Textarea
                    placeholder='Descrição'
                    id='description'
                    name='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme='blue'
              width='70%'
              marginRight='3'
              type='submit'
              isLoading={loading}
            >
              {props.postId ? 'Editar Post' : 'Novo Post'}
            </Button>
            <Button
              onClick={props.onClose}
              width='30%'
            >
              Fechar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default PostModal