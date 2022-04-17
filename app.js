//modulo http nativo do node
const http = require('http');

const Question  = require('./controller');
const { getReqData } = require('./utils');

// declaração da porta através de dotenv
const PORT = process.env.PORT || 3000;

//chamada do modulo http, com uma callback assíncrona contendo parametros de request e response
const server = http.createServer(async (req,res) => {

// /quizz/questions: GET
    if(req.url === '/quizz/questions' && req.method === 'GET'){

        const questions = await new Question().getQuestions();

        res.writeHead(200, {'Content-type': 'application/json'});

        res.end(JSON.stringify(questions));
    }

// /quizz/questions/id: GET
else if (req.url.match(/\/quizz\/questions\/([0-9]+)/) && req.method === 'GET'){
    try {
        const id = req.url.split('/')[3];

        const question = await new Question().getQuestions(id);

        res.writeHead(200,{ 'Content-Type': 'application/json'});
        res.end(JSON.stringify(question));
    }
    catch(error){

        res.writeHead(404,{ 'Content-type': 'application/json'});
        res.end(JSON.stringify({ message: error}))
    }
}
// /quizz/questions/:id : DELETE
else if (req.url.match(/\/quizz\questions\/([0-9]+)/) && req.method === 'DELETE') {
    try {

        const id = req.url.split('/')[3];

        const message = await new Question().deleteQuestion(id);

        res.writeHead(200,{ 'Content-type': 'application/json'});

        res.end(JSON.stringify({ message}));
    }
    catch(error){
        res.writeHead(404, { 'Content-type': 'application/json' });
        
        res.end(JSON.stringify({ message: error }));
    }
}

//  /quizz/questions/:id : UPDATE
else if (req.url.match(/\/quizz\questions\/([0-9]+)/) && req.method === 'PATCH'){
    try{

        const id = req.url.split('/')[3];

        let update_question = await new Question().updateQuestion(id);

        res.writeHead(200, { 'Content-type': 'application/json' });

        res.end(JSON.stringify({update_question}));
    }
    catch(error){
        res.writeHead(404, {'Content-type': 'application/json'});

        res.end(JSON.stringify({ message: error }));
    }
}
// /quizz/questions/ : POST
else if(req.url === '/quizz/questions' && req.method === 'POST'){
    let question_data = await getReqData(req);

    let question = await new Question().createQuestion(JSON.parse(question_data))

    res.writeHead(200, { 'Content-type': 'application/json'})

    res.end(JSON.stringify(question));
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