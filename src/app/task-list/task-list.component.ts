import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnChanges {
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
}
