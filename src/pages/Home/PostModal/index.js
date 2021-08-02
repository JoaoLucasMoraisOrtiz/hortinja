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
  Select,
  Textarea,
  Flex,
  Spinner,
  Image,
  Text,
  Box
} from '@chakra-ui/react'
import api from '../../../services/api'

import bgModal from '../../../assets/BackgroundModal.svg'

const PostModal = (props) => {

  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [color, setColor] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [nutritional, setNutritional] = useState('')
  const [averagePrice, setAveragePrice] = useState('')
  const [description, setDescription] = useState('')
  const [measurement, setMeasurement] = useState('')

  const [categorys, setCategorys] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(false)

  /* garante que todos os campos estarão limpos */
  const cleanFields = () => {
    setTitle('')
    setCategoryId('')
    setDescription('')
    setUrl('')
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
    if (props.postId) {
      /* metodo patch da api que edita o post (vide API controllers) */
      api.patch(`/posts/${props.postId}`, {
        /* campos a serem atualizados */
        title,
        url,
        color,
        categoryId,
        nutritional,
        averagePrice,
        measurement,
        description
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
        url,
        color,
        categoryId,
        nutritional,
        averagePrice,
        measurement,
        description
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
        /* espera um get na API para receber um json com todos os posts */
        const responsePost = await api.get(`/posts/${props.postId}`)

        /* Title recebe o titulo do post */
        setTitle(responsePost?.data?.title)

        /* Url recebe a url da imagem */
        setUrl(responsePost?.data?.url)

        /* Color recebe a cor do alimento */
        setColor(responsePost?.data?.color)

        /* categoryID recebe o Id da categoria */
        setCategoryId(responsePost?.data?.categoryId)

        /* nutritional recebe as vitaminas/minerais do alimento */
        setNutritional(responsePost?.data?.nutritional)

        /* averangePrice recebe o preço medio do alimento segundo a DB */
        setAveragePrice(responsePost?.data?.averagePrice)

        /* measurement recebe a unidade de medida do alimento */
        setMeasurement(responsePost?.data?.measurement)

        /* Description recebe a descrição do post */
        setDescription(responsePost?.data?.description)
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
      /* position='absolute' */
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
                      <FormControl paddingY='2%'>
                        <FormLabel>Categoria</FormLabel>
                        <Select
                          placeholder='Selecione a categoria'
                          id='category'
                          name='category'
                          value={categoryId}
                          onChange={(e) => setCategoryId(e.target.value)}
                          backgroundColor='#D9D2CF'
                          color='black'
                          borderRadius='32px'
                          fontWeight='600'
                          whidth='100%'
                        >
                          {categorys.map(category => (

                            <option
                              key={category?._id}
                              value={category?._id}
                            >
                              {`${category?.name}`}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl mt='4'>
                        <FormLabel>Nome da hortaliça</FormLabel>
                        <Input
                          placeholder='Nome descritivo da hortaliça'
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
                      <FormControl mt='4'>
                        <FormLabel>Url da Imagem</FormLabel>
                        <Input
                          type = 'text'
                          placeholder='Link da sua imagem'
                          id='url'
                          name='url'
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          backgroundColor='#D9D2CF'
                          color='black'
                          borderRadius='32px'
                          whidth='100%'
                        />
                      </FormControl>
                      <FormControl mt='4'>
                        <FormLabel>tonalidade</FormLabel>
                        <Input
                          placeholder='cor da sua Hortaliça'
                          id='color'
                          name='color'
                          value={color}
                          onChange={(e) => setUrl(e.target.value)}
                          backgroundColor='#D9D2CF'
                          color='black'
                          borderRadius='32px'
                          whidth='100%'
                        />
                      </FormControl>
                      <FormControl mt='4'>
                        <FormLabel>Benefícios Nutricionais</FormLabel>
                        <Input
                          placeholder='Vitaminas, minerais, etc...'
                          id='nutritional'
                          name='nutritional'
                          value={nutritional}
                          onChange={(e) => setUrl(e.target.value)}
                          backgroundColor='#D9D2CF'
                          color='black'
                          borderRadius='32px'
                          whidth='100%'
                        />
                      </FormControl>
                      <FormControl mt='4'>
                        <FormLabel>Preço Médio de Mercado</FormLabel>
                        <Input
                          placeholder='Preço, ex: 1.99'
                          id='averagePrice'
                          name='averagePrice'
                          value={averagePrice}
                          onChange={(e) => setUrl(e.target.value)}
                          backgroundColor='#D9D2CF'
                          color='black'
                          borderRadius='32px'
                          whidth='100%'
                        />
                      </FormControl>
                      <FormControl mt='4'>
                        <FormLabel>Unidade de medida</FormLabel>
                        <Input
                          placeholder='Unidade de medida, kg, uni, g...'
                          id='measurement'
                          name='measurement'
                          value={measurement}
                          onChange={(e) => setUrl(e.target.value)}
                          backgroundColor='#D9D2CF'
                          color='black'
                          borderRadius='32px'
                          whidth='100%'
                        />
                      </FormControl>
                      <FormControl mt='4'>
                        <FormLabel>Diga algo sobre esta Hortaliça</FormLabel>
                        <Textarea
                          placeholder='Descrição'
                          id='description'
                          name='description'
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
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

export default PostModal