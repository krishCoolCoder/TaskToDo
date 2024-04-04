import { Component,OnChanges, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';
import { ApiService } from '../service/api.service';
import { catchError, map } from 'rxjs/operators';

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

constructor ( private api: ApiService ) {}

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
    let todoListApi = this.api.todoListApi().pipe(
      map((response: any) => {
        console.log("queries.component.ts says that response is this : ", response);
        this.todoList = response?.data;
        this.noData = response?.data.length === 0 ? true : false; 

        // this.noData = response.data.length === 0 ? true : false;
        // this.taskList = response?.data
        return response; // Forward the response to the next operator
      }),
      catchError((error) => {
        // Handle error response here
        console.error('API Error:', error);
        // this.noData = this.response?.data.length === 0 ? true : false; 
        alert(error.error.message || error.statusText)
        throw error; // Re-throw the error to propagate it
        // Alternatively, you can return a default value or another Observable here
        // return of(defaultValue); // Return a default value
        // return throwError('Error occurred'); // Return another Observable
      })
    ).subscribe({
        next: (data) => {
          console.log('API Response:', data);
          // this.loader = false;
          // Handle the response data here
        },
        error: (error) => {
          console.error('API Error:', error);
          // this.loader = false;
          // Handle any errors here
        }
      });
    // console.log("PARENT Into the ngOnInit after edit")
    // this.todoList = JSON.parse(<any>localStorage.getItem('todoList'));
    // this.noData = this.todoList.length === 0 ? true : false;

    // let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    // console.log("The queryList before filter is this : ", this.todoList);
    // this.todoList = this.todoList.filter((data:any)=>{
    //   return ((data.organisationRef == organisationTeamMapping.currentOrganisation) && (data.currentTeamRef == organisationTeamMapping.currentTeam))
    // })
  }

  getInputValue ($event: any) {
    let todoListApi = this.api.todoListApi().pipe(
      map((response: any) => {
        console.log("queries.component.ts says that response is this : ", response);
        this.todoList = response?.data;
        this.noData = response?.data.length === 0 ? true : false; 

        // this.noData = response.data.length === 0 ? true : false;
        // this.taskList = response?.data
        return response; // Forward the response to the next operator
      }),
      catchError((error) => {
        // Handle error response here
        console.error('API Error:', error);
        // this.noData = this.response?.data.length === 0 ? true : false; 
        alert(error.error.message || error.statusText)
        throw error; // Re-throw the error to propagate it
        // Alternatively, you can return a default value or another Observable here
        // return of(defaultValue); // Return a default value
        // return throwError('Error occurred'); // Return another Observable
      })
    ).subscribe({
        next: (data) => {
          console.log('API Response:', data);
          // this.loader = false;
          // Handle the response data here
        },
        error: (error) => {
          console.error('API Error:', error);
          // this.loader = false;
          // Handle any errors here
        }
      });

    // console.log("PARENT Into the getIinpuValue and the $event is this : ", $event)
    // let todoList = JSON.parse(<any>localStorage.getItem('todoList'));
    // this.todoList = todoList;
    // this.noData = this.todoList.length === 0 ? true : false;

    // let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    // console.log("The queryList before filter is this : ", this.todoList);
    // this.todoList = this.todoList.filter((data:any)=>{
    //   return ((data.organisationRef == organisationTeamMapping.currentOrganisation) && (data.currentTeamRef == organisationTeamMapping.currentTeam))
    // })
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
  async deleteTodo(data: any) {
    let todoDeleteApi = await this.api.todoDeleteApi(data._id).pipe(
      map((response: any) => {
        console.log("queries.component.ts says that response is this : ", response);
        // this.requestList = response?.data;
        // this.noData = response?.data.length === 0 ? true : false; 

        // this.noData = response.data.length === 0 ? true : false;
        // this.taskList = response?.data
        let todoListApi = this.api.todoListApi().pipe(
          map((response: any) => {
            console.log("queries.component.ts says that response is this : ", response);
            this.todoList = response?.data;
            this.noData = response?.data.length === 0 ? true : false; 
    
            // this.noData = response.data.length === 0 ? true : false;
            // this.taskList = response?.data
            return response; // Forward the response to the next operator
          }),
          catchError((error) => {
            // Handle error response here
            console.error('API Error:', error);
            // this.noData = this.response?.data.length === 0 ? true : false; 
            alert(error.error.message || error.statusText)
            throw error; // Re-throw the error to propagate it
            // Alternatively, you can return a default value or another Observable here
            // return of(defaultValue); // Return a default value
            // return throwError('Error occurred'); // Return another Observable
          })
        ).subscribe({
            next: (data) => {
              console.log('API Response:', data);
              // this.loader = false;
              // Handle the response data here
            },
            error: (error) => {
              console.error('API Error:', error);
              // this.loader = false;
              // Handle any errors here
            }
          });
        return response; // Forward the response to the next operator
      }),
      catchError((error) => {
        // Handle error response here
        console.error('API Error:', error);
        let todoListApi = this.api.todoListApi().pipe(
          map((response: any) => {
            console.log("queries.component.ts says that response is this : ", response);
            this.todoList = response?.data;
            this.noData = response?.data.length === 0 ? true : false; 
    
            // this.noData = response.data.length === 0 ? true : false;
            // this.taskList = response?.data
            return response; // Forward the response to the next operator
          }),
          catchError((error) => {
            // Handle error response here
            console.error('API Error:', error);
            // this.noData = this.response?.data.length === 0 ? true : false; 
            alert(error.error.message || error.statusText)
            throw error; // Re-throw the error to propagate it
            // Alternatively, you can return a default value or another Observable here
            // return of(defaultValue); // Return a default value
            // return throwError('Error occurred'); // Return another Observable
          })
        ).subscribe({
            next: (data) => {
              console.log('API Response:', data);
              // this.loader = false;
              // Handle the response data here
            },
            error: (error) => {
              console.error('API Error:', error);
              // this.loader = false;
              // Handle any errors here
            }
          });
        // this.noData = this.response?.data.length === 0 ? true : false; 
        alert(error.error.message || error.statusText)
        throw error; // Re-throw the error to propagate it
        // Alternatively, you can return a default value or another Observable here
        // return of(defaultValue); // Return a default value
        // return throwError('Error occurred'); // Return another Observable
      })
    ).subscribe({
        next: (data) => {
          console.log('API Response:', data);
          // this.loader = false;
          // Handle the response data here
        },
        error: (error) => {
          console.error('API Error:', error);
          // this.loader = false;
          // Handle any errors here
        }
      });
  }
  editTask(data: any, flag: boolean) {
    console.log("The data in the parent component is this : ", data);
    this.todoData = data;
    this.isEdit = flag;
  }
  getDataFromHeader($event : any) {
    console.log("Into the headerData and the headerData is this : ");
    let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    this.todoList = JSON.parse(<any>localStorage.getItem('todoList'));
    console.log("The todoList before filter is this : ", this.todoList);
    this.todoList = this.todoList.filter((data:any)=>{
      return ((data.organisationRef == organisationTeamMapping.currentOrganisation) && (data.currentTeamRef == organisationTeamMapping.currentTeam))
    });
  }
}
