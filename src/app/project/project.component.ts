import { Component, SimpleChanges } from '@angular/core';
import { ApiService } from '../service/api.service';
import { catchError, map } from 'rxjs/operators';
import { ApiCall } from '../dependancy/apiService.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  
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

  constructor ( private api: ApiService, private testing: ApiCall ) {}

  async ngOnChanges(changes: SimpleChanges): Promise<any> {
    let projectListApi : any = await this.testing.projectListApi();
    this.listData = projectListApi;
    this.noData = projectListApi.length === 0 ? true : false;
  }
  async ngOnInit(): Promise<any> {
    let projectListApi : any = await this.testing.projectListApi();
    console.log("The projectList api is this : ", projectListApi)
    this.listData = projectListApi;
    this.noData = projectListApi.length === 0 ? true : false;
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
  // getReview () {
  //   this.userList.review = this.userList.performance === 0 ? "Lets see" : (this.userList.performance < 50 && this.userList.performance > 60 ) ? "Good" : ((this.userList.performance < 60 && this.userList.performance > 100)) ? "Very good" : "Satifactory"
  // }
  noData : boolean = true;

  async getInputValue ($event: any) {
    let projectListApi : any = await this.testing.projectListApi();
    this.listData = projectListApi;
    this.noData = projectListApi.length === 0 ? true : false;
  } 
  async deleteProject(data: any) {
    let projectDeleteApiResponse : any = await this.testing.projectDeleteApi(data._id);
    let projectListApiResponse : any = await this.testing.projectListApi();
    this.listData = projectListApiResponse;
    this.noData = projectListApiResponse.length === 0 ? true : false;
    
      // let todoDeleteApi = await this.api.organisationDeleteApi(data._id).pipe(
      //   map((response: any) => {
      //     console.log("queries.component.ts says that response is this : ", response);
      //     // this.requestList = response?.data;
      //     // this.noData = response?.data.length === 0 ? true : false; 
  
      //     // this.noData = response.data.length === 0 ? true : false;
      //     // this.taskList = response?.data
      //     let userListApi = this.api.organisationListApi().pipe(
      //       map((response: any) => {
      //         console.log("queries.component.ts says that response is this : ", response);
      //         this.listData = response?.data;
      //         this.noData = response?.data.length === 0 ? true : false; 
      
      //         // this.noData = response.data.length === 0 ? true : false;
      //         // this.taskList = response?.data
      //         return response; // Forward the response to the next operator
      //       }),
      //       catchError((error) => {
      //         // Handle error response here
      //         console.error('API Error:', error);
      //         // this.noData = this.response?.data.length === 0 ? true : false; 
      //         alert(error.error.message || error.statusText)
      //         throw error; // Re-throw the error to propagate it
      //         // Alternatively, you can return a default value or another Observable here
      //         // return of(defaultValue); // Return a default value
      //         // return throwError('Error occurred'); // Return another Observable
      //       })
      //     ).subscribe({
      //         next: (data) => {
      //           console.log('API Response:', data);
      //           // this.loader = false;
      //           // Handle the response data here
      //         },
      //         error: (error) => {
      //           console.error('API Error:', error);
      //           // this.loader = false;
      //           // Handle any errors here
      //         }
      //       });
      //     return response; // Forward the response to the next operator
      //   }),
      //   catchError((error) => {
      //     // Handle error response here
      //     console.error('API Error:', error);
      //     let userListApi = this.api.userListApi().pipe(
      //       map((response: any) => {
      //         console.log("queries.component.ts says that response is this : ", response);
      //         this.userList = response?.data;
      //         this.noData = response?.data.length === 0 ? true : false; 
      
      //         // this.noData = response.data.length === 0 ? true : false;
      //         // this.taskList = response?.data
      //         return response; // Forward the response to the next operator
      //       }),
      //       catchError((error) => {
      //         // Handle error response here
      //         console.error('API Error:', error);
      //         // this.noData = this.response?.data.length === 0 ? true : false; 
      //         alert(error.error.message || error.statusText)
      //         throw error; // Re-throw the error to propagate it
      //         // Alternatively, you can return a default value or another Observable here
      //         // return of(defaultValue); // Return a default value
      //         // return throwError('Error occurred'); // Return another Observable
      //       })
      //     ).subscribe({
      //         next: (data) => {
      //           console.log('API Response:', data);
      //           // this.loader = false;
      //           // Handle the response data here
      //         },
      //         error: (error) => {
      //           console.error('API Error:', error);
      //           // this.loader = false;
      //           // Handle any errors here
      //         }
      //       });
      //     // this.noData = this.response?.data.length === 0 ? true : false; 
      //     alert(error.error.message || error.statusText)
      //     throw error; // Re-throw the error to propagate it
      //     // Alternatively, you can return a default value or another Observable here
      //     // return of(defaultValue); // Return a default value
      //     // return throwError('Error occurred'); // Return another Observable
      //   })
      // ).subscribe({
      //     next: (data) => {
      //       console.log('API Response:', data);
      //       // this.loader = false;
      //       // Handle the response data here
      //     },
      //     error: (error) => {
      //       console.error('API Error:', error);
      //       // this.loader = false;
      //       // Handle any errors here
      //     }
      //   });
  
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
