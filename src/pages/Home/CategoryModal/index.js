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
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Spinner,
  Image,
  Text,
  Box
} from '@chakra-ui/react'
import api from '../../../services/api'

import bgModal from '../../../assets/BackgroundModal.svg'

const CategoryModal = (props) => {

  const [title, setTitle] = useState('')

  const [categorys, setCategorys] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(false)

  /* garante que todos os campos estarão limpos */
  const cleanFields = () => {
    setTitle('')

  }

  /* verifica para fechar o modal */
  const closeModal = () => {

    /* carregar recebe falso */
    setLoading(false)
    /* limpa os campos */
    cleanFields()
    /* chama a func. onClose() do index.js da Home */
    props.onClose()
  }

  /* faz as manipulações do submit */
  const handleSubmit = (e) => {
    /* preventDefault, faz com que não seja enviado para o server */
    e.preventDefault()
    /* recarrega */
    setLoading(true)

    /* postId carrega o id do post, vem da index da pasta Home, caso seja TRUE */
    if (props.categoryId) {
      /* metodo patch da api que edita o post (vide API controllers) */
      api.patch(`/posts/${props.postId}`, {
        /* campos a serem atualizados */
        title,
      })
        /* em caso de sucesso, reacarrega os posts */
        .then(() => {
          props.loadPosts()
        })

        /* em caso de erro, exibe o erro no console.log */
        .catch((err) => {
          console.log(err)
        })

        /* independente de erro ou acert, fecha o modal */
        .finally(() => closeModal())

      /* caso seja FALSE a afirmação do if */
    } else {

      /* api irá criar um novo post, com as mesmas informações do edit */
      api.post('/posts', {
        title,
      })
        /* se funcionar, recarrega os posts */
        .then(() => {
          props.loadPosts()
        })

        /* em caso de erro exibe-os no console */
        .catch((err) => {
          console.log(err)
        })
        /* independente do resultado, fecha o modal */
        .finally(() => closeModal())
    }
  }

  /* em caso de alguma alteração */
  useEffect(() => {
    /* se não ouver um postId... */
    if (!props.postId) {
      /* executa um cleanFields() para limpar os parâmetros */
      cleanFields()
    }
    /* ????? */
  }, [props.postId])

  useEffect(() => {
    /* se ouver um postId */
    if (props.postId) {

      /* setLoadingData recebe true */
      setLoadingData(true)

      /* const loadPosts recebe uma func. assincrona*/
      const loadPost = async () => {
        /* espera um get na API para receber um json com todos as categorys */
        const responsePost = await api.get(`/category/${props.postId}`)

        /* Title recebe o titulo do post */
        setTitle(responsePost?.data?.title)
      }

      /* recarrega os posts */
      loadPost()
        /* independente de qualquer coisa... */
        .finally(() => {
          /* muda a loadingData para false */
          setLoadingData(false)
        })


    }
    /* o useEffects será utilizado toda vez que houver uma alteração na props.postId */
  }, [props.postId])

  useEffect(() => {
    const loadCategorys = async () => {
      const response = await api.get('/category')
      setCategorys(response.data)
    }

    loadCategorys()
  }, [])

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      isCentered
      backgroundColor='#D9D2CF'
      position='absolute'
    >
      <ModalOverlay />

      <ModalContent
        borderRadius='32px'
        backgroundColor='#D9D2CF'
        position='absolute'
      >

        <Flex
          width='100%'
          flexDisplay='center'
          justifyContent='center'
          backgroundColor='#D9D2CF'
          borderRadius='32%'

        >
          <Image
            src={bgModal}
            width='100%'
          ></Image>
          <Text
            position='absolute'
            marginTop='25%'
            fontSize='x-large'

            color='white'><b>{props.postId ? 'Editar Hortaliça' : 'Nova Hortaliça'}</b></Text>
        </Flex>
        <ModalCloseButton color='white' />
        <form onSubmit={handleSubmit}>
          <ModalBody
            backgroundColor='#D9D2CF'
          >
            <Flex
              backgroundColor='#FFF'
              borderRadius='32px'
              justifyContent='center'
              whidth='fit-content'
            >
              <Box>
                {loadingData ? (
                  <Flex justifyContent='center' marginY='10'>
                    <Spinner color='green.500' />
                  </Flex>
                ) : (
                    <>

                      <FormControl mt='4'>
                        <FormLabel>Nome da categoria</FormLabel>
                        <Input
                          placeholder='Nome da categoria, Ex: Fruta'
                          id='title'
                          name='title'
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          backgroundColor='#D9D2CF'
                          color='black'
                          borderRadius='32px'
                          whidth='100%'
                        />
                      </FormControl>
                    </>
                  )}
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter
          >
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

export default CategoryModal