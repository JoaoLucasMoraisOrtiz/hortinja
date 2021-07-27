/*
    Arquivo inicial de routes, onde contem um export de todas as rotas do app
 */

 //requere do express a função Router()
const router = require('express').Router()

//importa do ./post as rotas de lá que são exportadas e sinalizadas
const posts = require('./posts')

//importa do ./categorys as rotas que são exportadas e sinalizadas de lá
const categorys = require('./category')

//router utiliza na URI "/posts" a rota contida em *posts* que foi importado
router.use('/posts', posts)

//router utiliza na URI "/categorys" a rota contida em *categorys* que foi importado
router.use('/category', categorys)

//exporta o router
module.exports = router

