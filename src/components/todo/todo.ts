/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View, NgIf, NgFor} from 'angular2/angular2';

@Component({
  selector: 'todo'
})
@View({
  templateUrl: 'components/todo/todo.html',
  styleUrls: ['components/todo/todo.css'],
  directives: [NgIf, NgFor]
})
export class TodoComponent {
  todos: Array<string>;

  constructor() {
    console.log('constructor: TodoComponent');
    this.todos = ['Clean house', 'Walk dog', 'Eat dinner'];
  }

  addTodo(todo: string) {
    this.todos.push(todo);
  }

  removeTodo(index: number) {
    this.todos.splice(index, 1);
  }

  doneTyping($event: any) {
    if ($event.which === 13) {
      this.addTodo($event.target.value);
    }
  }
}