import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ApiService } from '../service/api.service';
import { catchError, map } from 'rxjs/operators';

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

constructor ( private api: ApiService ) {}

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
  console.log("Into the ngOnChanges :")
  let taskListApi = await this.api.taskListApi().pipe(
    map((response: any) => {
      console.log("The response of the api is this : ", response);
      this.noData = response.data.length === 0 ? true : false;
      this.taskList = response?.data
      return response; // Forward the response to the next operator
    }),
    catchError((error) => {
      // Handle error response here
      console.error('API Error:', error);
      alert(error.error.message || error.statusText)
      throw error; // Re-throw the error to propagate it
      // Alternatively, you can return a default value or another Observable here
      // return of(defaultValue); // Return a default value
      // return throwError('Error occurred'); // Return another Observable
    })
  ).subscribe({
      next: (data) => {
        console.log('API Response:', data);
        this.loader = false;
        // Handle the response data here
      },
      error: (error) => {
        console.error('API Error:', error);
        this.loader = false;
        // Handle any errors here
      }
    });
  console.log("Into ngOnchanges and the api response is this : ", taskListApi)
  console.log("Into the on change on the parent compoenent : ", changes)
  // this.taskList = localStorage.getItem('userTasks')
  // let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
  // console.log("The organisationTeamMapping data on ngOnchanges is this : ", organisationTeamMapping)
  // this.noData = this.taskList.length === 0 ? true : false;
  // this.taskList = JSON.parse(<any>localStorage.getItem('userTasks'));
  // this.taskList = this.taskList.filter((data:any)=>{
  //   return ((data.organisationRef == organisationTeamMapping.currentOrganisation) && (data.currentTeamRef == organisationTeamMapping.currentTeam))
  // })
}
taskList : any = [];
noData : boolean = false;
isEdit : boolean = false;
loader: boolean = false;
ngOnInit () {
  let taskListApi = this.api.taskListApi().pipe(
    map((response: any) => {
      console.log("The response of the api is this : ", response);
      this.noData = response.data.length === 0 ? true : false;
      this.taskList = response?.data
      return response; // Forward the response to the next operator
    }),
    catchError((error) => {
      // Handle error response here
      console.error('API Error:', error);
      alert(error.error.message || error.statusText)
      throw error; // Re-throw the error to propagate it
      // Alternatively, you can return a default value or another Observable here
      // return of(defaultValue); // Return a default value
      // return throwError('Error occurred'); // Return another Observable
    })
  ).subscribe({
      next: (data) => {
        console.log('API Response:', data);
        this.loader = false;
        // Handle the response data here
      },
      error: (error) => {
        console.error('API Error:', error);
        this.loader = false;
        // Handle any errors here
      }
    });

  let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
  console.log("The organisationTeamMapping data on ngOnInit is this : ", organisationTeamMapping)
  // this.taskList = JSON.parse(<any>localStorage.getItem('userTasks'));
  console.log("The taskList on ngOnInit is tihs : ", this.taskList)
  this.noData = this.taskList.length === 0 ? true : false;
  // this.taskList = JSON.parse(<any>localStorage.getItem('userTasks'));
  // this.taskList = this.taskList.filter((data:any)=>{
  //   return ((data.organisationRef == organisationTeamMapping.currentOrganisation) && (data.currentTeamRef == organisationTeamMapping.currentTeam))
  // });
}
async getInputValue ($event: any) {
  let taskListApi = await this.api.taskListApi().pipe(
    map((response: any) => {
      console.log("The response of the api is this : ", response);
      this.noData = response.data.length === 0 ? true : false;
      this.taskList = response?.data
      return response; // Forward the response to the next operator
    }),
    catchError((error) => {
      // Handle error response here
      console.error('API Error:', error);
      alert(error.error.message || error.statusText)
      throw error; // Re-throw the error to propagate it
      // Alternatively, you can return a default value or another Observable here
      // return of(defaultValue); // Return a default value
      // return throwError('Error occurred'); // Return another Observable
    })
  ).subscribe({
      next: (data) => {
        console.log('API Response:', data);
        this.loader = false;
        // Handle the response data here
      },
      error: (error) => {
        console.error('API Error:', error);
        this.loader = false;
        // Handle any errors here
      }
    });
  // let userTasks = JSON.parse(<any>localStorage.getItem('userTasks'));
  // console.log("The userTasks are : ", userTasks);
  // this.taskList = userTasks;
  // console.log("And the array value is this : ", this.taskList)
  // this.noData = this.taskList.length === 0 ? true : false
  // let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
  // this.taskList = JSON.parse(<any>localStorage.getItem('userTasks'));
  // this.taskList = this.taskList.filter((data:any)=>{
  //   return ((data.organisationRef == organisationTeamMapping.currentOrganisation) && (data.currentTeamRef == organisationTeamMapping.currentTeam))
  // });
} 
async deleteTask(index: any) {
  let taskDeleteApi =await this.api.taskDeleteApi(index).pipe(
    map((response: any) => {
      console.log("The response of the api is this : ", response);
      this.noData = response.data.length === 0 ? true : false;
      this.taskList = response?.data
      return response; // Forward the response to the next operator
    }),
    catchError((error) => {
      // Handle error response here
      console.error('API Error:', error);
      alert(error.error.message || error.statusText)
      throw error; // Re-throw the error to propagate it
      // Alternatively, you can return a default value or another Observable here
      // return of(defaultValue); // Return a default value
      // return throwError('Error occurred'); // Return another Observable
    })
  ).subscribe({
      next: (data) => {
        console.log('API Response:', data);
        this.loader = false;
        // Handle the response data here
      },
      error: (error) => {
        console.error('API Error:', error);
        this.loader = false;
        // Handle any errors here
      }
    });
    let taskListApi = await this.api.taskListApi().pipe(
      map((response: any) => {
        console.log("The response of the api is this : ", response);
        this.noData = response.data.length === 0 ? true : false;
        this.taskList = response?.data;
        console.log("after the deletion")
        return response; // Forward the response to the next operator
      }),
      catchError((error) => {
        // Handle error response here
        console.error('API Error:', error);
        alert(error.error.message || error.statusText)
        throw error; // Re-throw the error to propagate it
        // Alternatively, you can return a default value or another Observable here
        // return of(defaultValue); // Return a default value
        // return throwError('Error occurred'); // Return another Observable
      })
    ).subscribe({
        next: (data) => {
          console.log('API Response:', data);
          this.loader = false;
          // Handle the response data here
        },
        error: (error) => {
          console.error('API Error:', error);
          this.loader = false;
          // Handle any errors here
        }
      });
  // let tasks = JSON.parse(<any>localStorage.getItem('userTasks'));
  // tasks.splice(index,1);
  // this.taskList = tasks;
  // localStorage.setItem('userTasks',JSON.stringify(tasks))
  // this.noData = this.taskList.length === 0 ? true : false;
  // this.taskList = JSON.parse(<any>localStorage.getItem('userTasks'));
  // let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
  // this.taskList = this.taskList.filter((data:any)=>{
  //   return ((data.organisationRef == organisationTeamMapping.currentOrganisation) && (data.currentTeamRef == organisationTeamMapping.currentTeam))
  // })
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
getDataFromHeader($event : any) {
  console.log("Into the headerData and the headerData is this : ");
  let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
  this.taskList = JSON.parse(<any>localStorage.getItem('userTasks'));
  console.log("The taskList before filter is this : ", this.taskList)
  this.taskList = this.taskList.filter((data:any)=>{
    return ((data.organisationRef == organisationTeamMapping.currentOrganisation) && (data.currentTeamRef == organisationTeamMapping.currentTeam))
  })
  console.log("The taskList after filter is this : ", this.taskList)
  // organisationRef : organisationTeamMapping.currentOrganisation,
  //             currentTeamRef : organisationTeamMapping.currentTeam
}
}
