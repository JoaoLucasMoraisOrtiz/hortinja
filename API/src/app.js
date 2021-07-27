//importa o express que nós instalamos com o comando require('express')
const express = require('express')

//importa o cors que foi instalado com o comando require('cors')
const cors = require('cors')

//importa o helmet com o comando require('helmet')
const helmet = require('helmet')

//importa as nossas rotas (URI) do "pacote" routers
const routes = require('./routes')
/*
    Observação: As importações em JS não são como no python em que nós damos um import
    e as novas funções são adicionadas como as nativas, no caso do JS ela permanesce
    dentro de uma variável ou constante, onde ela simboliza a classe mãe das novas 
    funções;
    Ex:
        No python temos dentro do pacote Time a função Sleep, portando podemos fazer:

            for time import sleep
            sleep(10)
        
        No caso do JS não podemos fazer isto, nos limitando à:
            
            import time
            time.sleep(10)

*/

/*
    isto "inicializa" o express, a função express() é a primeira a ser executada da
    biblioteca, e implica que seu uso seja feito para que possa ser chamada as outas
    funções ou métodos
*/
const app = express()

/*
    *app*, que recebeu a "incialização" do express, utiliza o metodo use para incluir
    a função json() para se poder trabalhar com este tipo de arquivo.
*/
app.use(express.json())

/*
    Como a função do express é basicamente criar middlewares entre objetos, ou seja:
    criar caminhos entre diferentes objetos, interligando o seu projeto com estes 
    outros portanto com o comando abaixo criamos um middleware com o cors, que nos 
    instalamos e importamos; Em resumo, o comando abaixo "inicializa" o cors no projeto
*/
app.use(cors())


/* 
    Esta sequência de comandos que seguem servem para adicionar as funções do helmet
    que nos estamos a expecificar. Antes temos de entender que o helmet é uma
    biblioteca de funções que tornam o código mais seguro. Nós vamos utilizar 3
    de suas funções:

        helmet.xssFilter()
        desativa bugs do browser para cross-site scripting.
        O cross-site scripting consiste em uma vulnerabilidade na qual alguém
        insere códigos JS na página, com a intensão de conseguir vantagens.
        Este tipo de ataque ocorre quando o hacker consegue acesso a um formulário
        que permita interações como campos de busca ou inserção de comentários.
        
        helmet.noSniff()
        Relativo ao MIME type, que é um mecanismo para dizer ao cliente qual tipo de
        arquivo está vindo do servidor, poque na Web as extenções de arquivo 
        (.doc; .png; etc...) tem valia. Assim devemos expecificar o tipo do arquivo.
        O Sniff acontece quando o tipo de dado não foi avisado, ou o cliente acha que
        ele está errado. Assim o noSniff() impede que o navegador do usuário "chute"
        o tipo de arquivo que esta sendo mandado.

        helmet.hidePoweredBy()
        Este comando remove o X-Powered-By, que é um tipo de header, no qual são
        enviadas informações do servidor como: nome, versão, tecnologia, SO, etc...
        Manter isto na aplicação pode gerar uma série de inseguranças.

*/
app.use(helmet.xssFilter())
app.use(helmet.noSniff())
app.use(helmet.hidePoweredBy())

//app também adiciona o router.
app.use(routes)

/*
    Nós podemos "exportar" uma variável ou objeto de um arquivo .js para outro.
    Quando fazemos isto ele começa a funcionar de forma parecida com os imports do python,
    e inclusive começam a ser chamados de import//export.
    No caso, nós adicionamos as configurações acima - com o use() - e agora vamos exportar este
    objeto de modo que, caso necessitemos, podemos fazer um:
    
        from app.js import app
    
    pois ele foi exportado com o comando abaixo. Entretanto, caso criassemos uma outra variável
    qualquer e não dessemos um *export "var qualquer"* não consiguiriamos fazer um:

        from app.js import "var qualquer"
*/
module.exports = app