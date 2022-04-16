const data = require('./data');

class Controller {

    //mostra todas as questões

    async getQuestions(){

        //chama promise que recebe os dados das questoes

        return new Promise((resolve, _) =>resolve(data));
    }

    // mostra uma questão através do id
    async getOneQuestion(id) {

        // retorna promise que busca questão através da função find 

        return new Promise((resolve, reject) => {
            let question = data.find((question) => question.id === parseInt(id));
            if (question){
                resolve(todo);
            } else {

                reject(`questão com ${id} nao encontrada`);

            }
        })
    }

    //Cria questão
   async createQuestion(question){

    //retorna promise que trás callback, gerando um id aleatório juntamente do spread que trás o resto dos atributos da question 
       return new Promise((resolve, _) => {
           let newQuestion = {
               id: Math.floor(4 + Math.random() * 10),
               ...question,
           };
           resolve(newQuestion);
       });
   } 

   // atualiza questão
   async updateQuestion(id){

        // retorna promise com parametros de resolve e reject, utilizando o find para pegar a questao pelo id e caso seja o id, atualize e retorne
       return new Promise((resolve,reject) =>{

        let question = data.find((question) => question.id === parseInt(id));

        if(!question){
            reject(`Sem questão com o ${id} encontrada`);
        }

        question['__v'] = 0;

        resolve(question);
       });
   }

   //remover questão
   async deleteQuestion(id){

        // retorna com a callback que recebe a questão através do id pelo método find e devolve as mensagens de reject, caso nao seja o id e a de resolve, caso seja deletada
       return newPromise((resolve, reject) =>{

           let question = data.find((question) => question.id === parseInt(id));

           if(!question){
               reject(`Sem questão com ${id} encontrada`);
           }
           resolve(`questao deletada com sucesso`);
       });
   }

}

module.exports = Controller;