/*
    O comando abaixo cria um objeto Router. Este objeto é um mini-aplicativo
    que funciona apenas para fazer roteamentos, ou seja, apenas para fazer
    transação de requisições como GET, POST, etc...
*/

const router = require('express').Router()

//importamos todos os conteúdos de controllers, como se ele fosse um pacote
const {posts} = require('../controllers')

/*
    Gere o que é chamado para cada URI vinda de https://localhost:<porta_utilizada>/posts:

    1. se a URI chamada for ...posts/ e o metodo chamado for o GET, a requisição irá chamar a 
    função list dentro de {posts}, e isto irá listar os posts do app;

    2. se a URI chamada for ...posts/ e o metodo chamado for o POST, a requisição irá chamar a 
    função create dentro de {posts}, e isto irá criar um novo post dentro do app;

    3. se a URI chamada for ...posts/<um ID válido>, e o metodo chamado for GET, a requisição
    irá chamar o a função show dentro de {posts}, que lista um post expecífico;

    4. se a URI chamada for ...posts/<um ID válido>, e o metodo chamado for PATCH, a requisição
    irá chamar o a função update dentro de {posts}, que edita um post expecífico;

    5. se a URI chamada for ...posts/<um ID válido>, e o metodo chamado for DELETE, a requisição
    irá chamar o a função destroy dentro de {posts}, que lista um post expecífico;
    
 */

// 1.
router.get('/', posts.list)

// 2.
router.post('/', posts.create)

// 3.
router.get('/:id', posts.show)

// 4.
router.patch('/:id', posts.update)

// 5.
router.delete('/:id', posts.destroy)

// exportamos o objeto router
module.exports = router