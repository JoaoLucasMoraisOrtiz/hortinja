/*
    Contem as aplicações das funções de CRUD relativas aos posts da aplicação, que estãp escritas em
    ../models
 */

 // importa o httpStatus para informar status dos sucessos e erros;
const httpStatus = require('http-status')

// o objeto Post importa ../models
const { Post } = require('../models')

// o objeto safeObjectId importa ../helpers
const { safeObjectId } = require('../helpers')

// cria o objeto methods que contem todas as funções de CRUD de posts
const methods = {

    /*
                        -=-=-=-=-=-=- Funções assincronas -=-=-=-=-=-=-
        
        funcionam basicamente da seguinte forma:
        a função deve ser denominadadamente assincrona, utilizando o async;
        utiliza o await, que funciona para esperar que uma promessa seja realizada;

        Porque utilizamos isto? 

        Isto é feito porque ocasionalmente pode ocorrer que a requisição pedida ainda não tenha chego,
        principalmente se tratando de WEB, onde pode haver lags, caimentos, entre outros.
        desta forma, nós prometemos para o programa que a requisição em sequência irá acontecer,
        assim ele irá esperar por ela.

    */

    // função assincrona - async - list, recebe dois argumentos: request, response, para listar posts
    async list(request, response) {
        
        // post recebe um novo objeto post -> que foi importado na linha 9
        const post = new Post()

        // try/cache, ou seja, "tente -> isto / caso erro -> isto"
        try {

            /*
                A constante posts recebe uma promessa de {post} (definido na linha 37) irá retornar
                a função list, com o objeto deletedAt no valor de $exists = false -> próprio do Mongo
            */
            const posts = await post.list({ deletedAt: { $exists: false } })

            //retorna a resposta http no código de OK, e um json de posts
            response.status(httpStatus.OK).json(posts)
        } catch(error) {

            // no caso de erro, retorna o erro http e um json contendo o erro
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    },

    // função assincrona - async - create, recebe dois argumentos: request, response, para criar posts
    async create(request, response) {


        const { title, url,  color, categoryId, nutritional, averagePrice, measurement, description } = request.body

        //constante post esta recebendo um novo Post
        const post = new Post()

        // se title ou url - definidos na linha 61* forem vazios:
        if (!title || !url) {

            // retorna uma resposta http de requerimento inválido, e um json com um erro
            return response.status(httpStatus.BAD_REQUEST).json({ error: 'The fields "title" and "url" are both required.' })
        }

        // se title ou url - definidos na linha 61* forem vazios:
        if (!categoryId || !averagePrice) {

            // retorna uma resposta http de requerimento inválido, e um json com um erro
            return response.status(httpStatus.BAD_REQUEST).json({ error: 'The fields "category" and "avarenge price" are both required.' })
        }

        // try/cache, ou seja, "tente -> isto / caso erro -> isto"
        try {
            /*
                insertedObject recebe uma promessa de que a função post vai chamar a função insertOne
                que recebera um objeto com title, url, categoryId = safeObjectId(categoryId),
                uma descrição, e os valores createdAt e updatedAt com a data atual.
            */
            const insertedObject = await post.insertOne({ title, url,  color, categoryId: safeObjectId(categoryId), nutritional, averagePrice, measurement, description, createdAt: Date.now(), updatedAt: Date.now() })

            // retorna uma resposta http de CRIADO, e um json com o insetedObject
            response.status(httpStatus.CREATED).json(insertedObject)
        } catch (error) {
            // no caso de erro retorna o código http do erro e um json com o erro
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    },

    // função assincrona - async - show, recebe dois argumentos: request, response, para exibir um post
    async show(request, response) {

        // o objeto id recebe os parametros de request
        const { id } = request.params

        //convertedObjectId recebe safeObjectId (que verifica a validade do id) com o parâmetro de {id}
        const convertedObjectId = safeObjectId(id)

        // post recebe um novo Post
        const post = new Post()

        // try/cache, ou seja, "tente -> isto / caso erro -> isto"
        try {

            /* 
                postToReturn recebema promessa de resposta de uma requisição para post na função 
                findOne que recebe como parâmetro o id com valor de convertedObjectId
            */
            const postToReturn = await post.findOne({  _id: convertedObjectId  })
            
            //retorna o código html de OK e um json de postToReturn
            response.status(httpStatus.OK).json(postToReturn)
        } catch (error) {

            // em caso de erro, retorna o status http de ERRO INTERNO DO SERVER e um json com o erro
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    },

    // função assincrona - async - update, recebe dois argumentos: request, response, para editar um post
    async update(request, response) {
        const { id } = request.params
        const convertedObjectId = safeObjectId(id)
        const { title, url,  color, categoryId, nutritional, averagePrice, measurement, description } = request.body

        if (!title || !url) {
            return response.status(httpStatus.BAD_REQUEST).json({ error: 'The fields "title" and "url" are both required.' })
        }

         // se categoryId ou avarangePrice - definidos na linha 61* forem vazios:
         if (!categoryId || !averagePrice) {

            // retorna uma resposta http de requerimento inválido, e um json com um erro
            return response.status(httpStatus.BAD_REQUEST).json({ error: 'The fields "category" and "avarenge price" are both required.' })
        }

        const post = new Post()

        try {
            const updatedObject = await post.updateOne({ _id: convertedObjectId }, { title, url, color, categoryId: safeObjectId(categoryId), nutritional, averagePrice, measurement, description, updatedAt: Date.now() })
            
            response.status(httpStatus.OK).json(updatedObject)
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    },

    // função assincrona - async - destroy, recebe dois argumentos: request, response, para "apagar" um post
    async destroy(request, response) {
        const { id } = request.params
        const convertedObjectId = safeObjectId(id)

        const post = new Post()

        try {
            const destroyedObject = await post.updateOne({ _id: convertedObjectId }, { deletedAt: Date.now() })
            
            response.status(httpStatus.NO_CONTENT).json()
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    }
}

// exporta methods
module.exports = methods