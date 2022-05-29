'use strict';

// <label class="todo__item">
// <input type="checkbox">
// <div>teste de item 2</div>
// <input type="button" value="X">
// </label> 

let banco = [
    {'task':'Estudar JS', 'status': ''},
    {'task':'Netflix', 'status': 'checked'},
    {'task':'Teste', 'status': ''}


];

const criarTarefa = (tarefa, status) => { // Status='' Se alguém não passa informação nenhuma, é pq tá vazio
    const area = document.createElement('label');
    area.classList.add('todo__item');
    area.innerHTML = `
        <input type="checkbox" ${status}=''>
        <div>${tarefa}</div>
        <input type="button" value="X">

    `
    
    document.getElementById('todoList').appendChild(area);

 
}

const limparTarefas = () => {
    const todoList = document.getElementById('todoList')    
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild)

        //Enquanto existir a primeira div, remove a última. 
        //Até que o último será o primeiro, então não existira mais primeiro

        if (todoList.firstChild === todoList.lastChild) {
            console.log('Última')

        }
    }

}

const atualizarTela = (teste) => {//Normalmente se coloca 'render', pois rendeiza na tela
    let i = 0
    limparTarefas() //Aqui tem que ficar antes, pois se mover para depois do 'foreach' ele apaga a que foi criada
    banco.forEach(item => criarTarefa(item.task, item.status));
    console.log(teste)
    
} 

atualizarTela('1');
