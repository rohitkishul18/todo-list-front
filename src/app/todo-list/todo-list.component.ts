import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  newTask: string = '';
  todos: any[] = [];
  isShowbutton: boolean = false;
  hasAccess: boolean = false;
  maxFreeTasks: number = 5;

  constructor(private todoService: TodoService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadtask();
    this.checkAccess();
  }

  checkAccess() {
     const user = JSON.parse(localStorage.getItem("user")!);
    this.http.post<{ hasAccess: boolean }>('http://localhost:5000/api/auth/access', {userId :user.user.id})
      .subscribe(res => {
        console.log(res);
        this.hasAccess = res.hasAccess;
      });
  }

  loadtask() {
    this.todoService.getTodos().subscribe((res) => {
      this.todos = res;
      this.isShowbutton = this.todos.length > 0;
    });
  }

  addTodo() {
    if (!this.newTask) return;

    if (!this.hasAccess && this.todos.length >= this.maxFreeTasks) {
      alert("Free limit reached. Please subscribe to add more tasks.");
      this.goToStripe();
      return;
    }

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

  goToStripe() {
  const user = JSON.parse(localStorage.getItem("user")!);
  console.log(user);
  this.http.post<{ url: string }>(
    "http://localhost:5000/api/payment/create-checkout-session",
    { userId: user.user.id }
  ).subscribe(res => {
     window.open(res.url, "_blank");
  });
}
}
