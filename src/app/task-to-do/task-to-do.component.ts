import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ApiService } from '../service/api.service';
import { catchError, map } from 'rxjs/operators';
import { FilterService } from '../service/filter.service';

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
  private filter : FilterService ) {}

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
  console.log("this.filter.isHeaderFilterEmpty() on ngOnChanges : ", this.filter.isHeaderFilterEmpty());
  let taskListApi = await this.api.taskListApi(
    !this.filter.isHeaderFilterEmpty() ? this.filter.getAllHeaderFilter() : null
  ).pipe(
    map((response: any) => {
      // console.log("The response of the api is this : ", response);
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
  // console.log("Into ngOnchanges and the api response is this : ", taskListApi)
  // console.log("Into the on change on the parent compoenent : ", changes)
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
progress ?: number;
ngOnInit () {
  console.log("this.filter.isHeaderFilterEmpty() on ngOninit : ", this.filter.isHeaderFilterEmpty());
  let taskListApi = this.api.taskListApi(
    !this.filter.isHeaderFilterEmpty() ? this.filter.getAllHeaderFilter() : null
  ).pipe(
    map((response: any) => {
      // console.log("The response of the api is this : ", response);
      this.noData = response.data.length === 0 ? true : false;
      this.taskList = response?.data
      return response; // Forward the response to the next operator
    }),
    catchError((error) => {
      // Handle error response here
      // console.error('API Error:', error);
      alert(error.error.message || error.statusText)
      throw error; // Re-throw the error to propagate it
      // Alternatively, you can return a default value or another Observable here
      // return of(defaultValue); // Return a default value
      // return throwError('Error occurred'); // Return another Observable
    })
  ).subscribe({
      next: (data) => {
        // console.log('API Response:', data);
        this.loader = false;
        // Handle the response data here
      },
      error: (error) => {
        // console.error('API Error:', error);
        this.loader = false;
        // Handle any errors here
      }
    });

  let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
  this.noData = this.taskList.length === 0 ? true : false;
}
async getInputValue ($event: any) {
  let taskListApi = await this.api.taskListApi(
    !this.filter.isHeaderFilterEmpty() ? this.filter.getAllHeaderFilter() : null
  ).pipe(
    map((response: any) => {
      // console.log("The response of the api is this : ", response);
      this.noData = response.data.length === 0 ? true : false;
      this.taskList = response?.data;
      this.isEdit = false;
      return response; // Forward the response to the next operator
    }),
    catchError((error) => {
      alert(error.error.message || error.statusText)
      throw error; // Re-throw the error to propagate it
    })
  ).subscribe({
      next: (data) => {
        // console.log('API Response:', data);
        this.loader = false;
        // Handle the response data here
      },
      error: (error) => {
        // console.error('API Error:', error);
        this.loader = false;
        // Handle any errors here
      }
    });
} 
async deleteTask(index: any) {
  let taskDeleteApi =await this.api.taskDeleteApi(index).pipe(
    map((response: any) => {
      this.noData = response.data.length === 0 ? true : false;
      this.taskList = response?.data
      return response; // Forward the response to the next operator
    }),
    catchError((error) => {
      alert(error.error.message || error.statusText)
      throw error; // Re-throw the error to propagate it
    })
  ).subscribe({
      next: (data) => {
        // console.log('API Response:', data);
        this.loader = false;
        // Handle the response data here
      },
      error: (error) => {
        // console.error('API Error:', error);
        this.loader = false;
        // Handle any errors here
      }
    });
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
}
editTask(data: any, flag: boolean){
  console.log("The data in the parent component is this : ", data, " and the flag is this : ", flag);
  let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
  if (organisationTeamMapping === null || organisationTeamMapping.currentTeam === undefined || organisationTeamMapping.currentOrganisation === undefined ) {
    alert("Kindly select organisation/account type and team.");
    return;
  }
  this.taskData = data; 
  this.isEdit = flag;
}
async getDataFromHeader($event : any) {
  console.log("Got the data from header : ",$event, " and the organisation filter from DI is this : ", this.filter.getAllHeaderFilter());
  console.log("this.filter.isHeaderFilterEmpty() on getDataFromHeader : ", this.filter.isHeaderFilterEmpty());
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
  // let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
  // this.taskList = JSON.parse(<any>localStorage.getItem('userTasks'));
  // this.taskList = this.taskList.filter((data:any)=>{
  //   return ((data.organisationRef == organisationTeamMapping.currentOrganisation) && (data.currentTeamRef == organisationTeamMapping.currentTeam))
  // })
}
getProgressValue(event: any) {
  // console.log("The event value is this : ", event.target.value)
  this.progress = event.target.value;
}
test(event: any) {
  console.log("Into the thing")
}
}
