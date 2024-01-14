import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    this.taskList = localStorage.getItem('userTasks')
  }
  taskList : any = [];
  ngOnInit () {
    this.taskList = JSON.parse(<any>localStorage.getItem('userTasks'));
  }
  getInputValue ($event: any) {
    let userTasks = JSON.parse(<any>localStorage.getItem('userTasks'));
    console.log("The userTasks are : ", userTasks);
    this.taskList = userTasks;
    console.log("And the array value is this : ", this.taskList)
  } 
  deleteTask(index: any) {
    let tasks = JSON.parse(<any>localStorage.getItem('userTasks'));
    tasks.splice(index,1);
    this.taskList = tasks;
    localStorage.setItem('userTasks',JSON.stringify(tasks))
  }
}
