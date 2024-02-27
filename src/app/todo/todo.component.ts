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

    let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    console.log("The queryList before filter is this : ", this.todoList);
    this.todoList = this.todoList.filter((data:any)=>{
      return ((data.organisationRef == organisationTeamMapping.currentOrganisation) && (data.currentTeamRef == organisationTeamMapping.currentTeam))
    })
  }
  
  ngOnInit() {
    console.log("PARENT Into the ngOnInit after edit")
    this.todoList = JSON.parse(<any>localStorage.getItem('todoList'));
    this.noData = this.todoList.length === 0 ? true : false;

    let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    console.log("The queryList before filter is this : ", this.todoList);
    this.todoList = this.todoList.filter((data:any)=>{
      return ((data.organisationRef == organisationTeamMapping.currentOrganisation) && (data.currentTeamRef == organisationTeamMapping.currentTeam))
    })
  }

  getInputValue ($event: any) {
    console.log("PARENT Into the getIinpuValue and the $event is this : ", $event)
    let todoList = JSON.parse(<any>localStorage.getItem('todoList'));
    this.todoList = todoList;
    this.noData = this.todoList.length === 0 ? true : false;

    let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    console.log("The queryList before filter is this : ", this.todoList);
    this.todoList = this.todoList.filter((data:any)=>{
      return ((data.organisationRef == organisationTeamMapping.currentOrganisation) && (data.currentTeamRef == organisationTeamMapping.currentTeam))
    })
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

    let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    console.log("The queryList before filter is this : ", this.todoList);
    this.todoList = this.todoList.filter((data:any)=>{
      return ((data.organisationRef == organisationTeamMapping.currentOrganisation) && (data.currentTeamRef == organisationTeamMapping.currentTeam))
    })
  }
  editTask(data: any, flag: boolean) {
    console.log("The data in the parent component is this : ", data);
    this.todoData = data.todoData;
    this.isEdit = flag;

    let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    console.log("The queryList before filter is this : ", this.todoList);
    this.todoList = this.todoList.filter((data:any)=>{
      return ((data.organisationRef == organisationTeamMapping.currentOrganisation) && (data.currentTeamRef == organisationTeamMapping.currentTeam))
    })
  }
  getDataFromHeader($event : any) {
    console.log("Into the headerData and the headerData is this : ");
    let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    this.todoList = JSON.parse(<any>localStorage.getItem('todoList'));
    console.log("The todoList before filter is this : ", this.todoList);
    this.todoList = this.todoList.filter((data:any)=>{
      return ((data.organisationRef == organisationTeamMapping.currentOrganisation) && (data.currentTeamRef == organisationTeamMapping.currentTeam))
    })
    console.log("The todoList after filter is this : ", this.todoList)
    // organisationRef : organisationTeamMapping.currentOrganisation,
    //             currentTeamRef : organisationTeamMapping.currentTeam
  }
}
