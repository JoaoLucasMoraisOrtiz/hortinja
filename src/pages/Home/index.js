/* Tentativa de adaptação 001 */

/* importa o próprio react, o useState e o useEffect
  
    1. useState -> permite utilização de Hooks;
    O que é um Hook? Um Hook é uma função especial que te permite utilizar recursos do React. 
    Por exemplo, useState é um Hook que te permite adicionar o state do React a um componente de 
    função.
    Quando eu deveria usar um Hook? Se você escreve um componente de função e percebe que precisa 
    adicionar algum state para ele, anteriormente você tinha que convertê-lo para uma classe.
    Agora você pode usar um Hook dentro de um componente de função existente.
    O useState é uma nova maneira de usar as mesmas capacidades que o this.state tem em uma classe.
    Normalmente, variáveis “desaparecem” quando a função sai mas variáveis de state
    são preservadas pelo React.

    Para melhor compreendermos utilizaremos um exemplo a seguir, onde quando clicamos em um btn, ele 
    adiciona +1 a uma variável;
    Normalmente, isto seria escrito com uma classe da seguinte forma:
    
    // classe exemplo estende react.component
    class Example extends React.Component {
      constructor(props) {
        super(props);

        //state recebe um objeto com valor inicial de 0
        this.state = {
          count: 0
        };
      }

      // renderiza na tela os elementos que ele receber
      render() {

        //retorna...
        return (
          <div>
            <p>You clicked {this.state.count} times</p>

            //quando o btn for clicado, executa a func. this.setState() que faz o count receber +1
            <button onClick={() => this.setState({ count: this.state.count + 1 })}>
              Click me
            </button>
          </div>
        );
      }
    }

    para facilitar as coisas e não nescessitar de se criar uma classe, foi desenvolvido o useState().
    utilizando esta ferramenta, o mesmo código acima ficaria:
      import React, { useState } from 'react';

      // função de exemplo
      function Example() {

        // Declarar uma nova variável de state, na qual chamaremos de "count",
        // e uma setCount que é uma função para o que vai acontecer com "count".
        // estas duas variáveis estão numa array e recebem o useState() no valor 0
        const [count, setCount] = useState(0);

        //retorna...
        return (
          <div>
            <p>You clicked {count} times</p>

            //quando clicado o botão executa uma arrow func. de setCount, que encrementa 1 em count
            <button onClick={() => setCount(count + 1)}>
              Click me
            </button>
          </div>
        );
      }
    
    2. UseEffect:
    Usando esse Hook, você diz ao React que o componente precisa fazer algo apenas
    depois da renderização. O React ira se lembrar da função que você passou (nos referiremos a ele 
    como nosso “efeito”), e chamá-la depois que realizar as atualizações do DOM. 
    podemos realizar busca de dados, chamar alguma API imperativa, mudar o titulo do doc, etc.

    Resumindo, ele irá carregar a página e depois disto irá alterar os elementos segundo uma "ordem",
    sem ter q recarregar a página.
    Colocamos useEffect dentro do componente. Isto permite acessar qualquer prop direto do efeito.
    Nós não precisamos de uma API especial para lê-los — já está no escopo da função.
    Hooks adotam as closures do JavaScript e evitam APIs especificas do React onde o JavaScript
    já provê uma solução.

    Por padrão, o useEffects roda depois da primeira renderização e depois de toda atualização




*/
import React, { useState, useEffect } from 'react'



/* importa Flex, image, IconButton,..., Spinner de chakra-ui */
import {
  //renderiza uma <div></div> com display:flex
  Flex,
  //renderiza uma imágem
  Image,
  //renderiza um icone que funciona como botão
  IconButton,
  //renderiza uma <div></div>
  Box,
  //renderiza um <p></p>
  Text,
  //cria um separador visual em uma lista ou grupo
  Divider,
  //renderiza um botão
  Button,
  //gera um spinner, ou seja, um "logo de carregando"
  Spinner,
  //categorias de seleção
  Select
} from "@chakra-ui/react"

//importa Logo de assets/logo.svg
import Logo from '../../assets/logo.svg'

//importa o plano de fundo do card central de assets/Background1.svg
import Bg1 from '../../assets/Background1.svg'

//importa o AddIcon (um icone de +) da biblioteca do chackra
import { AddIcon } from '@chakra-ui/icons'

//importa Post de components
import { Post } from '../../components'

//importa o PostModal
import PostModal from './PostModal'

//importa DeleteModal
import DeleteModal from './DeleteModal'

//importa Api
import api from '../../services/api' 

import steps from '../helpers/Steps'
import count from '../helpers/Count'


/* exporta a constante Home, que recebe uma função */
export const Home = () => {

  /* postModal e setPostModal recebe o estado de false */
  const [postModal, setPostModal] = useState(false)

  /* deleteModal e setDeleteModal recebem o estado de false */
  const [deleteModal, setDeleteModal] = useState(false)

  /* selectedPost e setSelectedPost recebem o estado de null */
  const [selectedPost, setSelectedPost] = useState(null)

  /* post e setPosts recebem o estado de [] */
  const [posts, setPosts] = useState([])

  /* loading e setLoading recebem o estado de false */
  const [loading, setLoading] = useState(false)

  /* 
                    -=-=-=-=-=-=-= INTEGRAÇÂO COM A API -=-=-=-=-=-=-=
  */

  /* 
    loadPosts: lista os posts do DB;
    Recebe uma arrow func. sem parâmetros
  */
  const loadPosts = () => {

    /* setLoading torna True */
    setLoading(true)

    /* dentro da api executa a func. get() com o parâmetro (que indica o caminho) '/posts' */
    api.get('/posts')

      /* recebe duas condições, quandoFunciona // quandoErro; No caso só recebeu quando Funciona*/
      .then(res => {
        /* quando funciona setPosts recebe res.data */
        setPosts(res.data)
        console.log(posts)
      })

      /* como não tratamos erros no then, os trataremos no catch */
      .catch(err => {
        /* em caso de erro, exibe o erro no console */
        console.log(err)
      })

      /* independente de erro ou acerto */
      .finally(() => {
        /* setLoading volta a ser false */
        setLoading(false)
      })
  }

  /* 
    handleOpenDeleteModal; deleta cards.
    Recebe uma arrow func. que tem porparâmetro um id.
  */
  const handleOpenDeleteModal = (id) => {
    /* setSelectedPost, que era null, torna-se um id */
    setSelectedPost(id)
    /* setDeleteModal, que era false, torna-se true */
    setDeleteModal(true)
  }

  /* 
    handleOpenEditModal; edita cards.
    Recebe uma arrow func. que tem por parâmetro um id.
  */
  const handleOpenEditModal = (id) => {
    /* setSelectedPost, que era null, torna-se um id */
    setSelectedPost(id)
    /* setPostModal, que era false, torna-se true */
    setPostModal(true)
  }

  useEffect(() => {
    loadPosts()
   /*  let allcategorys = count(posts)
    console.log(allcategorys) */
    console.log(`posts de useEffect${posts.categoryId}`)
    let categorys = steps(posts)
    console.log(categorys)
  }, [])
 

  /*
    sempre que qualquer estado se mudar (pois deixamos o segundo parâmetro vazio),
    ele executa a function de loadPosts()
  */
  useEffect(() => {
    loadPosts()
  }, [])

  /* retorna... */
  return (
    <>

      {/* Início do Header */}
      <Flex
        bg='#FFF'
        paddingY='2'
        justifyContent='space-between'
        alignItems='center'
        paddingRight='25vh'
        paddingLeft='25vh'
        
      >
        
          {/* logo do hortinjas */}
          <Image src={Logo} alt='Hortinja Logo' marginX='4'/>
          <Flex>
              
            {/* filtro de categorias */}
            <Select
              placeholder='Selecione uma categoria'
              id='author'
              name='author'
              borderRadius = '32px'
              width = '220px'
              maxWidth = '100%'
              colorScheme= '#D9D2CF'
            >
            </Select>


            {/* busca de hortaliças */}
            <Select
              placeholder='Buscar hortaliça'
              id='author'
              name='author'
              borderRadius = '32px'
              width = '220px'
              maxWidth = '100%'
              colorScheme= '#D9D2CF'
            ></Select>
          </Flex>

      </Flex>
      {/* uma div flex pai, que contem os elementos do card */}
      <Flex
        bg='#E5E5E5'
        flexDirection='column'
        justifyContent='center'
        minHeight='100%'
        colorScheme = '#ff0000'
        paddingX={['5%', '5%', '5%', '5%']}
      >
       

        {/* Início do Box de Ações lateral */}
        <Flex
          flexDirection='colum'
          flexWrap='wrap'
          minHeight='85vh'
          justifyContent='center'>
          {/* box de "titulo" */}
          <Flex width={['100%', '70%', '70%', '70%']} position='absolute' flexDirection='column'>
            <Flex
              bg='#FFF'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              marginY='3'
              borderRadius='35px'
            >
              {/* texto do título */}
              <Image src={Bg1} alt="plano de fundo" width="100%" height="100%"/>
              
              <Flex
                flexDirection='row'
                justifyContent = 'space-between'
                height = '100%'
                width = '100%'
                backgroundColor='00000'
                position = 'absolute'
              >

                <Flex
                backgroundColor='rgba( 255, 255, 255, 0.9)'
                height = '80%'
                width = '100%'
                marginTop = '10%'
                borderRadius = '32px'
                marginX='2%'
                flexDirection='column'
                padding ='20px'
                >
                  <Text fontWeight='800'>registros</Text>
                  <Text>Número de registros da horta</Text>

                  <Text
                    fontSize='42'
                    marginLeft = '45%'
                  >#29</Text>

                </Flex>

                <Flex
                backgroundColor='rgba( 255, 255, 255, 0.9)'
                height = '80%'
                width = '100%'
                marginTop = '10%'
                borderRadius = '32px'
                marginX='2%'
                flexDirection='column'
                >
                  <Text fontWeight='800'>registros</Text>
                  <Text>Número de registros da horta</Text>

                  <Text
                    fontSize='42'
                    marginLeft = '45%'
                  >
                      #4395
                  </Text>
                </Flex>

              </Flex>
              
            </Flex>
          </Flex>
          {/* Início dos Posts */}
          <Box 
            width={['100%', 3/4, 3/4, 3/4]}
            minHeight='85vh'
            justifyContent='center'
            alignItems='center'
          >
            {/* if(loading){
                retorna um Flex com um spinner azul
                }else{
                  retorna os posts
                } */}
            {loading ? (
              <Flex justifyContent='center' alignItems='center' height='50vh'>
                <Spinner color='green.500'/>
              </Flex>
            ) : (
              <Flex 
              flexDirection='row'
              marginTop = '30%'
              marginLeft={['0', '4', '4', '4']}

              >
                
                {/*
                  dando um map em posts (linha 152);
                    o map chama uma callback, que deve ser uma função, que receberá por parâmetro
                    um item de um array (um por vez, em sequencia de ordem crescente).
                    a partir od parâmetro desta função callback, podemos trabalhar o dado.
                    No caso abaixo, o que está acontecendo depende inteiramente da linha 218-220;
                    Basicamente para relembrar, estas linhas chamam a func. "loadPost()" que determina
                    o valor de "setPost()" (linha 151-152), ao qual determina um "useState()" (linha 1)
                    para "posts". Este state será uma array com os JSON dos cards posts que a API
                    retorna quando fazemos uma req. "GET" em /posts (vide: API/src/routes).
                    resumindo, "posts" é uma array onde cada elemento é um JSON com as informações
                    dos cards de post.
                */}
                {posts.map(post => (

                  
                  

                  /* chamamos um elemento Post que importamos na linha 128 */
                  <Post
                    /*
                      A expressão abaixo é bem intuitíva com exeção do "?".
                      Este ponto de exclamação quer dizer que irá primeiro se verificar se existe
                      o proximo atributo(no primeiro caso, o _id), para não acontecer de que um atraso
                      na internet, faça com que os posts fiquem como undefined
                     */
                    key={post?._id}
                    /* url da imágem */
                    url={post?.url}
                    /* titulo do post */
                    title={post?.title}
                    /* author={`${post?.author?.firstName} ${post?.author?.lastName}`} */
                    description={post?.description}
                    averagePrice = {post?.averagePrice}
                    measurement = {post?.measurement}
                    /* handleOpenEditModal captura o id do card clicado */
                    openShowModal = {() => console.log(post?.id)}
                    openEditModal={() => handleOpenEditModal(post?._id)}
                    openDeleteModal={() => handleOpenDeleteModal(post?._id)}
                    
                  />
                ))}
              </Flex>
            )}
          </Box>
        </Flex>
        {/* Início do Footer */}
        <Box marginY='4'>
          <Text textAlign='center' fontSize='15px' color='gray'>
            Copyright © 2021 Feito com ❤ por Kazap Tecnologia - Todos os direitos reservados
          </Text>
        </Box>
      </Flex>

      {/* PostModal foi importado no começo do arquivo */}
      <PostModal 
        /*
          se postModal, que é um useStatus da linha 133/134, com seu valor original é false for true,
          significa que tocamos no botão de criar um novo post
        */
        isOpen={postModal}

        /* quando fechado... */
        onClose={() => {
          /* setPostModal volta a ser false */
          setPostModal(false)
          /* setSelectedPost vola a ser null */
          setSelectedPost(null)
        }}
        /* postId recebe o id de selectedPost, que veio da handleOpen(Edit/Delete)Modal, na linha 317/318 */
        postId={selectedPost}
        /* loadPosts recebe loadPosts */
        loadPosts={loadPosts}
      />

      {/* DeleteModal foi importado no começo do arquivo */}
      <DeleteModal
        /*
          se deleteModal, da linha 136/137, que tem o valor original de false, for true;
          significa que estamos tentando deletar um post
        */
        isOpen={deleteModal}

        /* quando fechar */
        onClose={() => {
          /* setDeleteModal torna-se false */
          setDeleteModal(false)
          /* setSelectedPost torna-se null */
          setSelectedPost(null)
        }}
        /* postId = selectedPost */
        postId={selectedPost}
        /* loadPosts = loadPosts, */
        loadPosts={loadPosts}
      />
    </>
  )
}