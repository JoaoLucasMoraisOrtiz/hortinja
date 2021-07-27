/*
    Cria a conexão com o Banco de Dados Mongo
    **Comentado por cima**
*/

//importa a biblioteca do mongo
const MongoDB = require('mongodb')

//pega a chave e o endereço da database
const secrets = require('../../secrets.json')

// cria um mongo client
const MongoClient = MongoDB.MongoClient

// configurações do mongo -> vide Doc
const MongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }

// Classe com as funções de CRUD no DB do mongoDB
class Database {
    constructor() {
        //a collection é vazia para que ela possa ser utilizada como uma classe gerérica (para posts e autores)
        this.collection = ''
    }

    // função que será utilizada apenas na classe começa com "_":
    async _getMongoClientAndCollection() {

        //peaga o banco de dados e a key dele
        const MongoURI = secrets.mongoURI

        // {client} = promiss da conexão do BD -> MongoURI, e das configs dele -> MongoOptions
        const client = await MongoClient.connect(MongoURI, MongoOptions)

        //database recebe a database em sí com suas coleções
        const database = client.db()

        //collection recebe a coleção expecificada na linha 22 com *collection*
        const collection = database.collection(this.collection)

        // retorna um objeto com a coleção e o banco de dados
        return { client, collection }
    }

    // função assincrona para inserir objetos no banco de dados:
    async insertOne(objectToInsert) {

        // pega o banco de dados e a coleção com a função criada na linha 26
        const { client, collection } = await this._getMongoClientAndCollection()

        try {
            // abre a conexão com o banco de dado e da um await para o comando de inserir um objeto
            const document = await collection.insertOne(objectToInsert)

            // fecha a conexão
            client.close()

            // retorna o documento
            return document
        } catch (error) {
            // em caso de erro exibe o erro
            throw new Error(error)
        }
    }

    // função assincrona para listar os objetos do banco de dados:
    async list(params = {}, sort = {}) {

        // pega o banco de dados e a coleção com a função criada na linha 26
        const { client, collection } = await this._getMongoClientAndCollection()

        try {
            // documents recebe uma promiss de receber os objetos do BD organizados em uma array 
            const documents = await collection.find(params).sort(sort).toArray()

            // fecha a conexão com o Banco de Dados
            client.close()

            // retorna documents
            return documents
        } catch(error) {

            // em caso de erro exibe o erro
            throw new Error(error)
        }
    }

    // função assincrona para dar update em um valor do banco de dados
    async updateOne(queryFilter, newValues) {
        // pega o banco de dados e a coleção com a função criada na linha 26
        const { client, collection } = await this._getMongoClientAndCollection()

        try {
            // documents recebe uma promiss de receber o resultado de um update em um determinado arquivo no BD
            const document = await collection.findOneAndUpdate(queryFilter, { $set: newValues }, { returnDocument: 'after'} )

            // fecha a conexão com o Banco de Dados
            client.close()

            // retorna document
            return document
        } catch(error) {
            // em caso de erro exibe o erro
            throw new Error(error)
        }
    }

    // função assincrona para encontrar um elemento no banco de dados
    async findOne(queryFilter) {

        // pega o banco de dados e a coleção com a função criada na linha 26
        const { client, collection } = await this._getMongoClientAndCollection()

        try {
            // documents recebe uma promiss de receber o resultado de uma busca por um objeto no BD
            const document = await collection.findOne(queryFilter)

            // fecha a conexão com o Banco de Dados
            client.close()

            // retorna document
            return document
        } catch(error) {

            // em caso de erro exibe-o
            throw new Error(error)
        }
    }
}

// exporta a class Database
module.exports = Database
