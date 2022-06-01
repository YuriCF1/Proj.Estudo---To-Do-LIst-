// 'use strict';

// <label class="todo__item">
// <input type="checkbox">
// <div>teste de item 2</div>
// <input type="button" value="X">
// </label> 

// let banco = [
//     {'task':'Estudar JS', 'status': ''},
//     {'task':'Netflix', 'status': 'checked'},
//     {'task':'Teste', 'status': ''}

// ];

//Função para celular
const botao = document.getElementById('botaoadd');
const inpuTexto = document.getElementById('newItem');

botao.addEventListener("click", function (e) { 
    const banco = getBanco();
        banco.push ({'task': inpuTexto.value, 'status': ''})
       //Pode ser também: banco.push ({'task': evento.target.value, 'status': ''}) //O valor do alvo do evento, no caso, o texto
       setBanco(banco)
       atualizarTela();
       inpuTexto.value = ''; //Limpar a tarefa
})

//Função terminada

const getBanco = () => JSON.parse(localStorage.getItem('todoListItem')) ?? [];
//Nome dado para o item do localSotage 
//?? = Se isso não existir
//Se houve algo no localStorage chamado 'todoListItem', pegar isso. Se não, passar uma array vazia
    //Array vazia é necessária para não dar erro. Um valor vazio é melhor do que um valor inexistente
const setBanco = (banco) => localStorage.setItem('todoListItem', JSON.stringify(banco))


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
            //Anotação de estudo
        }
    }
}

const atualizarTela = (teste) => {//Normalmente se coloca 'render', pois rendeiza na tela
    limparTarefas() //Aqui tem que ficar antes, pois se mover para depois do 'foreach' ele apaga a que foi criada
    const banco = getBanco() // Depois que comentei o 'Banco' la em cima, tenho que redefinir pelo padrão do localStorage
    banco.forEach( (item, indice) => criarTarefa(item.task, item.status, indice));
    console.log(teste)    
} 

const inserirItem = (evento) => { //O addEventListener manda para o callback'inserirItem' o evento que aconteceu
    const tecla = evento.key;
   // const texto = evento.target.value;
    if (tecla === 'Enter') {
        const banco = getBanco();
        banco.push ({'task': evento.target.value, 'status': ''})
       //Pode ser também: banco.push ({'task': evento.target.value, 'status': ''}) //O valor do alvo do evento, no caso, o texto
       setBanco(banco)
       atualizarTela();
        evento.target.value = ''; //Limpar a tarefa
    }
    // console.log(tecla)
}

const removerItem = (indice) => {
    const banco = getBanco()
    banco.splice(indice, 1); //A partir do 'indice' que recebe, na posiação '1' = Ele próprio
    setBanco(banco)
    atualizarTela();//Splice é pra recortar/modificar um array
    //Splice começa com 1 e não com 0
}

//Modificar o banco - part 2
const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' :''// ? Então : Se não
    setBanco(banco);
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