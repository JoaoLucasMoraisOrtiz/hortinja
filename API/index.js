/*
    Este é o arquivo de inicialização do webapp
*/

//importa o app exportado em /src/app
const app = require('./src/app')

//faz o requerimento do secrets.json que contem a chave do DB e da porta a se utilizada
const secrets = require('./secrets.json')

//app.listen() -> função do cors que instalamos, e colocamos o app para escutarmos na porta correta
app.listen(secrets.port, () => {
    console.log(`Server is up and running on http://localhost:${secrets.port} - enjoy!`)
})