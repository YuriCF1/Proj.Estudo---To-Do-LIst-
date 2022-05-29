'use strict';

// <label class="todo__item">
// <input type="checkbox">
// <div>teste de item 2</div>
// <input type="button" value="X">
// </label> 

let banco = [
    {'tarefa':'Estudar JS', 'status': ''},
    {'tarefa':'Netflix', 'status': 'checked'}


];

const criarItem = (tarefa, status='') => { // Se alguém não passa informação nenhuma, é pq tá vazio
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
        <input type="checkbox" ${status}=''>
        <div>${tarefa}</div>
        <input type="button" value="X">

    `
    
    document.getElementById('todoList').appendChild(item);

 
}

const atualizarTela = () => {//Normalmente se coloca 'render', pois rendeiza na tela
    banco.forEach(item => criarItem(item.tarefa)); 

} 

atualizarTela();