/*
    indica onde estão as funções de CRUD para os posts e os categorys
 */

// indica que tudo relativo ao CRUD de posts - que são chamadas pelo routes - estarão em ./posts
const posts = require('./posts')

// indica que tudo relativo ao CRUD de categorys - que são chamadas pelo routes - estarão em ./categorys
const categorys = require('./category')

//exporta em um objeto posts e categorys
module.exports = { posts, categorys }