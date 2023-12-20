import { Component } from '@angular/core';

@Component({
  selector: 'app-task-component',
  templateUrl: './task-component.component.html',
  styleUrls: ['./task-component.component.css']
})
export class TaskComponentComponent {
  todoList : any = []
  itemValue: any = "";

  itemInput(event: any) {
    this.itemValue = event.target.value;
  }

  addItem() {
    this.itemValue !== "" ? this.todoList.push( this.itemValue) : "";
    this.itemValue = ""
  }

}
