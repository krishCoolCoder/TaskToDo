import { Component } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  taskList : any = [];
  getInputValue ($event: any) {
    console.log("The event value is this : ", $event);
    this.taskList.push(Object($event));
    console.log("And the array value is this : ", this.taskList)
  } 
}
