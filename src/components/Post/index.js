/* Local de criação do card de post */

/* importa o React */
import React from 'react'

/* importa o flex, image... Button do chakra-ui */
import { Flex, Image, Box, Text, Button } from '@chakra-ui/react'

/* icone de editar e excluir do chakra também */
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

/* imagem de não encontrado para caso de server error */
import ImageNotFound from '../../assets/image-not-found.jpg'

import PostBg from '../../assets/BackgroundCard.svg'

/*
  post recebe uma arrow func. com o argumento nomeado props, que virá a ser um elemento Post com
  atributos.
*/


const Post = (props) => {

  let mainTitle = props.title.split(' ')

  /*   console.log(mainTitle) */



  /* retorna... */
  return (

    /* display: flex */
    <Flex
      key={props.key}
      bg='#FFF'
      width='fit-content'
      borderRadius='20px'
      justifyContent='center'
      flexDirection='column'
      padding='1%'
      mb='3'
      mt={[0, 0, 3, 3]}
      boxShadow='rgb(0, 0, 0, 0.3) 10px 10px 30px 1px'
      margin='2%'
    >
      <Flex
        min-width='100%'
        name = 'parent1'
        justifyContent='center'
        /* alignContent='center' */
      >
        <Image
          whidth='100%'
          src={PostBg}
        />
        <Flex
          position="absolute"
          flexDirection='row'
          padding='1%'
          alignItens='center'
          name ='parent2'
        >
          <Image
            src={props.url}

            width='16vh'
            height='16vh'

            borderRadius='50%'
            fallbackSrc={ImageNotFound}
            marginLeft='1%'
            marginTop='3%'
          />
          <Text
            align='right'
            color='#FFF'
            fontSize='36'
            marginLeft="5%"
          >
            <b>{mainTitle["0"]}</b>
          </Text>
        </Flex>
      </Flex>
      {/* conteúdo do card */}
      <Box>
        <Text><b>{props.title}</b></Text>
        <Text fontSize='sm' noOfLines='4'>{props.description}</Text>
      </Box>

      {/* botões e preço médio */}
      <Flex justifyContent='left' >
        <Button
          onClick={props.openEditModal}
          variant='ghost'
          height='fit-content'
          width='fit-content'
        >
          <EditIcon />
        </Button>
        <Button
          colorScheme='red'
          onClick={props.openDeleteModal}
          variant='ghost'
          height='fit-content'
          width='fit-content'
        >
          <DeleteIcon />
        </Button>
        <Box
          display='inline-flex'
        >
          <Text fontSize='smaller'><b>Média</b> R$</Text>
          <Text
            fontSize='x-large'
            color='#006B5C'
          > <b>{parseFloat(props.averagePrice)}</b></Text>
          <Text fontSize='smaller'>{props.measurement}</Text>
        </Box>
      </Flex>
    </Flex>
  )
}

export default Post