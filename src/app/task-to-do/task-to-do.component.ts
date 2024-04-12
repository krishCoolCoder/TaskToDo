import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ApiService } from '../service/api.service';
import { catchError, map } from 'rxjs/operators';
import { FilterService } from '../service/filter.service';
import { ApiCall } from '../dependancy/apiService.service';

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

constructor ( 
  private api: ApiService,
  private filter : FilterService,
  private testApi : ApiCall ) {}

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

async ngOnChanges(changes: SimpleChanges): Promise<any> {
  this.taskList = this.testApi.taskListApi(!this.filter.isHeaderFilterEmpty() ? this.filter.getAllHeaderFilter() : null);
  this.noData = this.taskList.length === 0 ? true : false;
}
taskList : any = [];
noData : boolean = false;
isEdit : boolean = false;
loader: boolean = false;
progress ?: number;
ngOnInit () {
  this.taskList = this.testApi.taskListApi(!this.filter.isHeaderFilterEmpty() ? this.filter.getAllHeaderFilter() : null);
  this.noData = this.taskList.length === 0 ? true : false;

  let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
  this.noData = this.taskList.length === 0 ? true : false;
}
async getInputValue ($event: any) {
  this.taskList = await this.testApi.taskListApi(!this.filter.isHeaderFilterEmpty() ? this.filter.getAllHeaderFilter() : null);
  this.noData = this.taskList.length === 0 ? true : false;
} 
async deleteTask(index: any) {
  let taskDeleteApi = await this.testApi.taskDeleteApi(index);
  this.taskList = await this.testApi.taskListApi(!this.filter.isHeaderFilterEmpty() ? this.filter.getAllHeaderFilter() : null);
  this.noData = this.taskList.length === 0 ? true : false;
}
editTask(data: any, flag: boolean){
  let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
  if (organisationTeamMapping === null || organisationTeamMapping.currentTeam === undefined || organisationTeamMapping.currentOrganisation === undefined ) {
    alert("Kindly select organisation/account type and team.");
    return;
  }
  this.taskData = data; 
  this.isEdit = flag;
}
async getDataFromHeader($event : any) {
  let taskListApi = await this.api.taskListApi(
    !this.filter.isHeaderFilterEmpty() ? this.filter.getAllHeaderFilter() : null
  ).pipe(
    map((response: any) => {
      this.noData = response.data.length === 0 ? true : false;
      this.taskList = response?.data;
      return response; // Forward the response to the next operator
    }),
    catchError((error) => {
      alert(error.error.message || error.statusText)
      throw error; // Re-throw the error to propagate it
    })
  ).subscribe({
      next: (data) => {
        this.loader = false;
        // Handle the response data here
      },
      error: (error) => {
        this.loader = false;
        // Handle any errors here
      }
    });
}
getProgressValue(event: any) {
  this.progress = event.target.value;
}
test(event: any) {
}
}
