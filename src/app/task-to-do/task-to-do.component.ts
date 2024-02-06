import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'app-task-to-do',
  templateUrl: './task-to-do.component.html',
  styleUrls: ['./task-to-do.component.css']
})
export class TaskToDoComponent implements OnInit, OnChanges {

  taskData: any;
// views state : 
tableView : boolean = false;
listView : boolean = false;
cardView : boolean = true;

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
  console.log("Into the on change on the parent compoenent : ", changes)
  this.taskList = localStorage.getItem('userTasks')
  this.noData = this.taskList.length === 0 ? true : false
}
taskList : any = [];
noData : boolean = false;
ngOnInit () {
  this.taskList = JSON.parse(<any>localStorage.getItem('userTasks'));
  this.noData = this.taskList.length === 0 ? true : false
}
getInputValue ($event: any) {
  let userTasks = JSON.parse(<any>localStorage.getItem('userTasks'));
  console.log("The userTasks are : ", userTasks);
  this.taskList = userTasks;
  console.log("And the array value is this : ", this.taskList)
  this.noData = this.taskList.length === 0 ? true : false
} 
deleteTask(index: any) {
  let tasks = JSON.parse(<any>localStorage.getItem('userTasks'));
  tasks.splice(index,1);
  this.taskList = tasks;
  localStorage.setItem('userTasks',JSON.stringify(tasks))
  this.noData = this.taskList.length === 0 ? true : false
}
editTask(data: any){
  console.log("The data in the parent component is this : ", data);
  this.taskData = data;
}
}
