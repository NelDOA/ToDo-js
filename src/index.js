import './styles.css'

import{Todo, TodoList} from './js/classes';
import { crearTodoHtml } from './js/componentes';

export const todoList = new TodoList();

todoList.todos.forEach(todo => {
    crearTodoHtml(todo);
});