import { Todo } from ".";
import { todoList } from "../..";

export class TodoList{

    constructor() {
        this.cargarLocalStorage();
    }

    nuevoTodo( todo ) {
        this.todos.push( todo );
        this.guardarLocalStorage();
    }

    eliminarTodo( id ) {
        this.todos = this.todos.filter(todo => todo.id != id );
        this.guardarLocalStorage();
    }

    marcarCompletado ( id ) {
            
        for (const todo of this.todos) {
            //  comparar el id recibido con cada elemento del arreglo
            if ( todo.id == id ) {
                //si coincide, se cambia su estado
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            } 
        }
    }

    eliminarCompletados () {
        this.todos = this.todos.filter(todo => !todo.completado);
        this.guardarLocalStorage();
    }

    guardarLocalStorage () {
        localStorage.setItem('todo',JSON.stringify(this.todos));
    }
    
    cargarLocalStorage () {
        this.todos = (localStorage.getItem('todo')) ? JSON.parse( localStorage.getItem('todo') ) : [];
        this.todos = this.todos.map(obj => Todo.fromJsonToTodo(obj));
    }

}