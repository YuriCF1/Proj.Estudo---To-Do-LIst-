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

const criarTarefa = (tarefa, status, indice) => { // Status='' Se alguém não passa informação nenhuma, é pq tá vazio
    const area = document.createElement('label');
    area.classList.add('todo__item');
    area.innerHTML = `
        <input type="checkbox" ${status}='' data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>

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
    limparTarefas() //Aqui tem que ficar antes, pois se mover para depois do 'foreach' ele apaga a que foi criada
    banco.forEach( (item, indice) => criarTarefa(item.task, item.status, indice));
    console.log(teste)
    
} 

const inserirItem = (evento) => { //O addEventListener manda para o callback'inserirItem' o evento que aconteceu
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter') {
        banco.push ({'task': evento.target.value, 'status': ''})
       //Pode ser também: banco.push ({'task': evento.target.value, 'status': ''}) //O valor do alvo do evento, no caso, o texto
        atualizarTela('1');
        evento.target.value = ''; //Limpar a tarefa
    }
    console.log(tecla)
}

const removerItem = (indice) => {
    banco.splice(indice, 1); 
    atualizarTela();//Splice é pra recortar/modificar um array
    //Splice começa com 1 e não com 0

}

//Modificar o banco - part 2
const atualizarItem = (indice) => {
    banco[indice].status = banco[indice].status === '' ? 'checked' :''// ? Então : Se não
    atualizarTela();
}

const clickItem = (evento) => { //O addEventListener manda para o callback'clickItem' o evento que aconteceu
    const elementoClicado = evento.target;
    if (elementoClicado.type === 'button') {
        const indice = elementoClicado.dataset.indice //Dataset = Valor do data no html. Passei o nome do data de 'indice'
        removerItem(indice);

    //Modificar o banco - part 1
    } else if (elementoClicado.type === "checkbox") {
        const indice = elementoClicado.dataset.indice;
        atualizarItem (indice);

    }
    console.log(elementoClicado)
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);
atualizarTela('1');