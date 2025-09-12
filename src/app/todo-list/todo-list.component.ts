import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  newTask: string = '';
  todos: any[] = [];
  isShowbutton:boolean= false;
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadtask();
  }

  loadtask() {
    this.todoService.getTodos().subscribe((res) => {
      this.todos = res;
      this.isShowbutton = this.todos.length > 0;
    });
  }

  addTodo() {
    if (!this.newTask) return;
    this.todoService.addTodo(this.newTask).subscribe(() => {
      this.newTask = '';
      this.loadtask();
    });
  }

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.loadtask();
    });
  }

  toggleComplete(todo: any) {
    this.todoService
      .updateTodo(todo._id, { completed: !todo.completed })
      .subscribe(() => {
        this.loadtask();
      });
  }

  deleteAlltodolist() {
  if (confirm("Are you sure you want to delete all todos?")) {
    this.todoService.deleteAlltodolist().subscribe(() => {
      this.todos = []; 
    });
  }
}
}
