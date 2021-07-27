/* 
    Sinaliza onde está os conteúdos relativos a categorys
*/

//router recebe um import da função Router() de express
const router = require('express').Router()

// o objeto {categorys} recebe um import de controllers
const { categorys } = require('../controllers')

/*
    Gere o que é chamado para cada URI vinda de https://localhost:<porta_utilizada>/categorys:

        1. se a URI for ...categorys/ e router chamar um metodo GET, a requisição será
        enviada para o {categorys} na função list, que listaria os autores;

        2. se a URI for ...categorys/ e o router chamar um metodo POST, a requisição será
        enviada para o {categorys} na função create, que criará um novo autor;

        3. se a URI for ...categorys/<um ID de categorys> e o router chamar o metodo GET, a requisição
        será enviada para o {categorys} na função show, que listará o elemento de categorys
        com o ID correspondente;

        4. se a URI for ...categorys/<um ID de categorys> e o router chamar o metodo POST, a requisição
        será enviada para o {categorys} na função update, que editará o elemento de categorys
        com o ID correspondente;

        5. se a URI for ...categorys/<um ID de categorys> e o router chamar o metodo DELETE, a requisição
        será enviada para o {categorys} na função destroy, que listará o elemento de categorys
        com o ID correspondente;

 */

 // 1.
router.get('/', categorys.list)

// 2.
router.post('/', categorys.create)

// 3.
router.get('/:id', categorys.show)

// 4.
router.patch('/:id', categorys.update)

// 5.
router.delete('/:id', categorys.destroy)

//exporta o objeto router
module.exports = router