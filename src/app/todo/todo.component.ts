import { Component,OnChanges, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnChanges {
  performanceLineChart : any = [];
  inputData : any;
  todoList: any = JSON.parse(<any>localStorage.getItem('todoList'));
  
  // views state : 
tableView : boolean = false;
listView : boolean = false;
cardView : boolean = true;

noData : any = this.todoList.length === 0 ? true : false;

showTableView () {
  this.tableView = true ;
  this.listView = false;
  this.cardView = false;
}
showListView () {
  this.tableView = false ;
  this.listView = true;
  this.cardView = false;
}
showCardView () {
  this.tableView = false ;
  this.listView = false;
  this.cardView = true;
}

  ngOnChanges(changes: SimpleChanges): void {
    this.todoList = JSON.parse(<any>localStorage.getItem('todoList'));
    this.noData = this.todoList.length === 0 ? true : false
  }

  ngOnInit() {
    this.todoList = JSON.parse(<any>localStorage.getItem('todoList'));
    this.noData = this.todoList.length === 0 ? true : false;
  }

  getTodoData(event: any) {
  this.inputData = event.target.value;
  }
  submitTodoData() {
  this.todoList.push(this.inputData);
  console.log("The list is : ", this.todoList);
  localStorage.setItem('todoList',JSON.stringify(this.todoList));
  this.noData = this.todoList.length === 0 ? true : false;
  }
  deleteToDo(index: any) {
    let todoList = JSON.parse(<any>localStorage.getItem('todoList'));
    todoList.splice(index,1);
    this.todoList = todoList;
    localStorage.setItem('todoList',JSON.stringify(todoList));
    this.noData = this.todoList.length === 0 ? true : false;
  }
}
