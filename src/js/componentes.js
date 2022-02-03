const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnEliminarCompletados = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');

import { Todo } from "./classes";
import { todoList } from "../index.js"

export const crearTodoHtml = (todo) => {
    const htmlTodo = `
    <li class='${(todo.completado) ? 'completed': '' }' data-id='${todo.id}'>
        <div class="view">
            <input class="toggle" type="checkbox" '${(todo.completado) ? 'checked': '' }'>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Rule the web">
    </li> `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;
}


//eventos

txtInput.addEventListener('keyup', ( event ) => {
    if ( event.keyCode === 13 && txtInput.value.length > 0 ) {
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click',(event) => {
    const nombreElemento = event.target.localName;
    const todoElemento   = event.target.parentElement.parentElement;
    const todoId         = todoElemento.getAttribute('data-id');

    if (nombreElemento.includes('input')) {
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')) {
        todoList.eliminarCompletados(todoId);
        divTodoList.removeChild(todoElemento);
    }
});

btnEliminarCompletados.addEventListener('click',()=>{
    todoList.eliminarCompletados();
    for (let i = divTodoList.childElementCount-1; i >= 0; i--) {
        const todo = divTodoList.children[i];
        if (todo.classList.contains('completed')) {
            divTodoList.removeChild(todo);
        }
    }
})

ulFilters.addEventListener('click', (event) => {
    const filtro = event.target.text;
    if (!filtro) {
        return;
    }
    for (const elemento of divTodoList.children) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;
        }
    }
})