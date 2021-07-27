import React from 'react'
import { Flex, Image, Box, Text, Button } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import ImageNotFound from '../../assets/image-not-found.jpg'

const Post = (props) => {
  return (
    <Flex
      key={props.key}
      bg='#FFF'
      borderRadius='20px'
      flexWrap='wrap'
      mb='3'
      mt={[0, 0, 3, 3]}
      boxShadow='rgb(0, 0, 0, 0.3) 10px 10px 30px 1px'
    >
      <Flex 
        width={['100%', '100%', '100%', '30%']}
        flexDirection='column'
        justifyContent='space-between'
        paddingY='5'
        paddingX='3'
      >
        <Box>
          <Text fontSize='xl'><b>Título</b></Text>
          <Text fontSize='sm' isTruncated>{props.title}</Text>
        </Box>
        <Box>
          <Text fontSize='xl'><b>Autor</b></Text>
          <Text fontSize='sm' isTruncated>{props.author}</Text>
        </Box>
        <Box>
          <Text fontSize='xl'><b>Descrição</b></Text>
          <Text fontSize='sm' noOfLines='4'>{props.description}</Text>
        </Box>
        <Flex flexWrap='wrap' justifyContent='center'>
          <Button
            rightIcon={<EditIcon/>}
            variant='ghost'
            onClick={props.openEditModal}
          >
            Editar
          </Button>
          <Button
            rightIcon={<DeleteIcon/>}
            variant='ghost'
            colorScheme='red'
            onClick={props.openDeleteModal}
          >
            Excluir
          </Button>
        </Flex>
      </Flex>
      <Image
        src={props.url}
        width={['100%', '100%', '100%', '70%']}
        borderTopRightRadius={['0px', '0px', '0px', '20px']}
        borderBottomRightRadius='20px'
        borderBottomLeftRadius={['20px', '20px', '20px', '0px']}
        objectFit='cover'
        fallbackSrc={ImageNotFound}
      />
    </Flex>
  )
}

export default Post