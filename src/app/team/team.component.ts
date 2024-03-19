import { Component, SimpleChanges } from '@angular/core';
import { ApiService } from '../service/api.service';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {
  
  
  listData: any;
  isEdit : boolean = false;
  // views state : 
  tableView : boolean = false;
  listView : boolean = false;
  cardView : boolean = true;
  teamOrgData : any;
  test: boolean = false;
  changeTest():void {
    this.test = !this.test;
  }

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
    let organisationListApi = this.api.teamListApi("65edfc5757d78be6ce6be6b2").pipe(
      map((response: any) => {
        this.listData = response?.data;
        this.noData = response?.data.length === 0 ? true : false; 
        console.log("The noData is this : ", this.noData)
        return response; // Forward the response to the next operator
      }),
      catchError((error) => {
        // Handle error response here
        console.error('API Error:', error);
        alert(error.error.message || error.statusText)
        throw error; // Re-throw the error to propagate it
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
  ngOnInit(): void {
    let organisationListApi = this.api.teamListApi("65edfc5757d78be6ce6be6b2").pipe(
      map((response: any) => {
        this.listData = response?.data;
        this.noData = response?.data.length === 0 ? true : false; 
        console.log("The noData is this : ", this.noData)
        return response; // Forward the response to the next operator
      }),
      catchError((error) => {
        // Handle error response here
        console.error('API Error:', error);
        alert(error.error.message || error.statusText)
        throw error; // Re-throw the error to propagate it
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

  userList : any = [
    {
      userName : "Saikrishna P",
      userEmail : "saikrishnatechno@gmail.com",
      userRole : "Admin",
      totalTaskCount : 0,
      completedTaskCount : 0,
      pendingTaskCount : 0,
      taskToDoCount : 0,
      performance : 50,
      review : "Lets see"
    }
  ];
  noData : boolean = true;

  getInputValue ($event: any) {
      let teamListApi = this.api.teamListApi("65edfc5757d78be6ce6be6b2").pipe(
        map((response: any) => {
          this.listData = response?.data;
          this.noData = response?.data.length === 0 ? true : false; 
          console.log("The noData is this : ", this.noData)
          return response; // Forward the response to the next operator
        }),
        catchError((error) => {
          // Handle error response here
          console.error('API Error:', error);
          alert(error.error.message || error.statusText)
          throw error; // Re-throw the error to propagate it
        })
      ).subscribe({
          next: (data) => {
            console.log('API Response:', data);
            // this.loader = false;
            // Handle the response data here
          },
          error: (error) => {
            console.error('API Error:', error);
          }
        });
  } 
  async deleteTeamOrOrganisation(data: any) {
    let todoDeleteApi = await this.api.teamDeleteApi(data._id).pipe(
      map((response: any) => {
        console.log("queries.component.ts says that response is this : ", response);
        // this.requestList = response?.data;
        // this.noData = response?.data.length === 0 ? true : false; 

        // this.noData = response.data.length === 0 ? true : false;
        // this.taskList = response?.data
        let teamListApi = this.api.teamListApi("65edfc5757d78be6ce6be6b2").pipe(
          map((response: any) => {
            console.log("queries.component.ts says that response is this : ", response);
            this.userList = response?.data;
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
        let userListApi = this.api.userListApi().pipe(
          map((response: any) => {
            console.log("queries.component.ts says that response is this : ", response);
            this.userList = response?.data;
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
    
  // console.log("The delete user method says : ","'"+data+"'");
  // let userData = JSON.parse(<any>localStorage.getItem('userList'));
  // userData.splice(data,1);
  // this.userList = userData;
  // localStorage.setItem('userList',JSON.stringify(userData))
  // this.noData = this.userList.length === 0 ? true : false; 
  }
  editUser(data: any, flag: boolean) {
    console.log("The data in editUser is this : ", data)
    this.teamOrgData = data;
    this.isEdit = flag;
    this.test = true;
  }
}
