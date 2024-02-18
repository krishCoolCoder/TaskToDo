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
  let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
  console.log("The organisationTeamMapping data on ngOnchanges is this : ", organisationTeamMapping)
  this.noData = this.taskList.length === 0 ? true : false
}
taskList : any = [];
noData : boolean = false;
isEdit : boolean = false;
ngOnInit () {
  let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
  console.log("The organisationTeamMapping data on ngOnInit is this : ", organisationTeamMapping)
  this.taskList = JSON.parse(<any>localStorage.getItem('userTasks'));
  console.log("The taskList on ngOnInit is tihs : ", this.taskList)
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
editTask(data: any, flag: boolean){
  console.log("The data in the parent component is this : ", data);
  let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
  if (organisationTeamMapping === null || organisationTeamMapping.currentTeam === undefined || organisationTeamMapping.currentOrganisation === undefined ) {
    alert("Kindly select organisation/account type and team.");
    console.log("kkkkkkkkkkkkk")
    return;
  }
  this.taskData = data; 
  this.isEdit = flag;
}
}
