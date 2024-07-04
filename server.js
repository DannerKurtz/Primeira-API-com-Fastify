/**
 * npm init -y (faz com que adicione o package do node para conseguir importar).
 * node --watch server.js, faz com que consiga executar o server sem se preocupar com ele ficar reiniciando toda vez que fizer uma alteração, já que ele faz isso automaticamente toda vez que salva o arquivo, também pode se criar um dev script dentro do packege.json.
 * para instalar a bibliolteca do postgres é sóp inicializar o comando npm install postgres.
 */


// Servidor nativo do node.js
// import { createServer } from 'node:http';
// import { resolve } from 'node:path';

// const server = createServer((request, response) => {
//     response.write("ola mundo!")
//     return response.end()
// })

// server.listen(3232);

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// servidor com framework 
// para instalar a dependencia fastify, usa-se o comando: npm install fastify

// aqui importa o fastify
import { fastify } from "fastify";

// importaremos a classe que criamos para um banco de dados em memória.
// import {DataBaseMemory} from './database-memory.js'

//importando o database 
import { DataBasePostgres } from "./database-postgres.js";

// inicializamos o server com fastify atribuindo ele a uma constante.
const server = fastify();

// Iremos inicializar o database que criamos em memória com const nomeDoDatabase = new NomeDaClasse
// const database = new DataBaseMemory();

// Inicializando com o banco de dados.
const database = new DataBasePostgres;

// CRUD (Create, Read, Uptade, Delete) com fastify.
/**
 * MÉTODOS HTTP
 * GET - Obter as informaçôes;
 * POST - Criar um registro;
 * PUT - Ateração;
 * DELETE - Deletar;
 * PATCH - Altera apenas uma informação específica;
 */

// Podemos ter métodos http diferentes com a mesma rota
// Para definir qual método e qual rota será, faremos da seguinte forma:
/**
 * iremos iniciar com as constante que iniciamos com o fastify, neste caso server, em seguita determinaremos o método que queremos:
 * server.post = dentro do método http escolhido precisamos passar a roda desejada no caso /videos, e em seguida podemos colocar qual tipo de requisição é request ou reply (mesma coisa que o response).
 * ficará da seguinte forma: server.post('/videos', (aqui que colocará se for request ou reply) => {iniciaremos a função que vai estar o código}).
 * Lembrando que quando acessamos a rota pelo navegador ele sepre utilizara o método get para fazer a requisição.
 * Nos métodos post e put, podemos enviar um request body, que é um corpo de requisição.
 */
server.post('/videos', async (request, reply) =>{
    // criaremos um request body.
    const {title, description, duration} = request.body;
    /**
     * Utilizando o Database em memória.    
     */
    // Chamaremos o método criar do nosso database em memória.
    await database.create({
        title,
        description,
        duration,
    })

    // Lembrando que tem que passar o tipo da respota que o navegador irá receber neste caso será o 201, que significa que algo foi criado.
    return reply.status(201).send();
});

server.get('/videos',  async (request) =>{
    const search = request.query.search;


    // Só chamamos o método list, para que retorne todos os itens do array
    const videos = await database.list(search);
    
    return videos;
});

// no put e delete, como queremos alterar apenas um item específico teremos que passar na rota o que chamamos de Route Parameter, que é o que você deseja buscar. Para fazer é só colocar '/:eOQueDesejaBuscar'.
server.put('/videos/:id', (request, reply) => {
    // Utilizaremos o request params, para pegar o parametro do id que está na url
    const videoId = request.params.id;

    // Assim como no post precisamos definir o corpo da nossa requisição.
    const {title, description, duration} = request.body;

    // Aqui faremos com que ele faça o uptade passando o id como chave, e os conteúdos.
    database.update(videoId, {
        title,
        description,
        duration,
    });

    return reply.status(204).send();
});

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id;

    await database.delete(videoId);

    return reply.status(204).send()
});
// o server.listen irá fazer com que a api escute pela porta desejada.
server.listen({
    port:3232,
})