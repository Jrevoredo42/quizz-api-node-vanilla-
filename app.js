//modulo http nativo do node

const http = require('http');

// declaração da porta através de dotenv

const PORT = process.env.PORT || 3000;

//chamada do modulo http, com uma callback assíncrona contendo parametros de request e response

const server = http.createServer(async (req,res) => {

// condição que executa caso o request atenda a url '/api' e a ao metodo GET, com status 200 e seu conteudo em JSON, mais mensagem de confirmação 

    if(req.url === '/api' && req.method === 'GET'){
        res.writeHead(200, {'Content-type': 'application/json'});

        res.write('Olá mundo, esta é uma API em nodeJS Vanilla');

        res.end();
    }

// mensagem de status 404, descrevendo que rota nao foi encontrada
    else{
        res.writeHead(404, {'Content-type': 'application/json'});
        res.end(JSON.stringify({ message: 'Route not found'}));
    }

});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});