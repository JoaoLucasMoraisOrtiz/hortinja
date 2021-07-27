/*
    converte os IDs do Banco de Dados, e devolve eles convertidos
*/
const ObjectId = require('mongodb').ObjectId

const safeObjectId = id => {
    try {
        const convertedId = ObjectId(id)

        return convertedId
    } catch (error) {
        return false
    }
}

module.exports = safeObjectId