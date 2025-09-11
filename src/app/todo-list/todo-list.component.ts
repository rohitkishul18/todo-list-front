import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  newTask :string = ""    
  todos: any[] = [];
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadtask();
  }

  loadtask(){
    this.todoService.getTodos().subscribe((res)=>{
        this.todos = res;
    })
  }

  addTodo(){
    if(!this.newTask) return; 
    this.todoService.addTodo(this.newTask).subscribe(()=>{
      this.newTask = "";
      this.loadtask();
    })
  }

  deleteTodo(id:string)
  {
    this.todoService.deleteTodo(id).subscribe(()=>{this.loadtask()})
  }

  toggleComplete(todo:any){
    this.todoService.updateTodo(todo._id,{completed:!todo.completed}).subscribe(()=>{
      this.loadtask();
    })
  }

}
