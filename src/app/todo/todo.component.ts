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
todoData : any;

isEdit : boolean = false;

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
    console.log("PARENT Into the ngOnChanges after edit")
    this.todoList = JSON.parse(<any>localStorage.getItem('todoList'));
    this.noData = this.todoList.length === 0 ? true : false;
  }
  
  ngOnInit() {
    console.log("PARENT Into the ngOnInit after edit")
    this.todoList = JSON.parse(<any>localStorage.getItem('todoList'));
    this.noData = this.todoList.length === 0 ? true : false;
  }

  getInputValue ($event: any) {
    console.log("PARENT Into the getIinpuValue and the $event is this : ", $event)
    let todoList = JSON.parse(<any>localStorage.getItem('todoList'));
    this.todoList = todoList;
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
  editTask(data: any, flag: boolean) {
    console.log("The data in the parent component is this : ", data);
    this.todoData = data;
    this.isEdit = flag;
  }
}
