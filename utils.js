// controla alguns casos de uso da API, dentre elas, uma função que armazena os dados do cliente no servidor

function getReqData(req){
    //Promise que faz req do dado que pode ser recebido, o atribuindo a variável em formato de string;

    return new Promise((resolve,reject) => {

        try {
            let body = '';

            //requisição do dado

            req.on('data', (chunk) =>{

            //atribuição para string

                body += chunk.toString();
            });

            //retorno do dado

            req.on('end', () => {
                resolve(body);
            });

            //em caso de nao retornar o dado
        }
        catch (err){
            reject(err);
        }   
    });
}

module.exports = { getReqData };

