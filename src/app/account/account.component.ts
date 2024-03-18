import { Component, SimpleChanges } from '@angular/core';
import { ApiService } from '../service/api.service';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  listData: any;
  listType: any="Organisation";
  isEdit : boolean = false;
  // views state : 
  tableView : boolean = false;
  listView : boolean = false;
  cardView : boolean = true;
  teamOrgData : any;

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
    this.userList = localStorage.getItem('userList');
    console.log("The ngOnChanges method has been called and the user Data is this : ", typeof this.userList)
  }
  ngOnInit(): void {
    if (this.listType == "Team"){
    let teamListApi = this.api.teamListApi("65edfc5757d78be6ce6be6b2").pipe(
      map((response: any) => {
        this.listData = response?.data;
        console.log("The listdata is this : ", this.listData, " and the listType is this : ", this.listType)
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
    } else {
      let userListApi = this.api.organisationListApi().pipe(
        map((response: any) => {
          console.log("queries.component.ts says that response is this : ", response);
          this.listData = response?.data;
          this.noData = response?.data.length === 0 ? true : false; 
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
    }
    
    // this.userList = JSON.parse(<any>localStorage.getItem('userList'));
    // this.noData = this.userList.length === 0 ? true : false;
    // // this.userList.review = this.userList.performance === 0 ? "Lets see" : (this.userList.performance < 50 && this.userList.performance > 60 ) ? "Good" : ((this.userList.performance < 60 && this.userList.performance > 100)) ? "Very good" : "Satifactory";
    // console.log("The ngOnInit is being called and the value is : ", this.userList)
    // // throw new Error('Method not implemented.');
  }

  organisationListView(){
    console.log("The organisation list is selected : ")
    this.listType = "Organisation";
    let userListApi = this.api.organisationListApi().pipe(
      map((response: any) => {
        console.log("queries.component.ts says that response is this : ", response);
        this.listData = response?.data;
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

  }
  teamListView(){
    this.listType = "Team";
    console.log("The team list is selected : ")
    let teamListApi = this.api.teamListApi("65edfc5757d78be6ce6be6b2").pipe(
      map((response: any) => {
        this.listData = response?.data;
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
  // getReview () {
  //   this.userList.review = this.userList.performance === 0 ? "Lets see" : (this.userList.performance < 50 && this.userList.performance > 60 ) ? "Good" : ((this.userList.performance < 60 && this.userList.performance > 100)) ? "Very good" : "Satifactory"
  // }
  noData : boolean = true;

  getInputValue ($event: any) {
    if (this.listType == "Team"){
      let teamListApi = this.api.teamListApi("65edfc5757d78be6ce6be6b2").pipe(
        map((response: any) => {
          this.listData = response?.data;
          console.log("The listdata is this : ", this.listData, " and the listType is this : ", this.listType)
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
      } else {
        let userListApi = this.api.organisationListApi().pipe(
          map((response: any) => {
            console.log("queries.component.ts says that response is this : ", response);
            this.listData = response?.data;
            this.noData = response?.data.length === 0 ? true : false; 
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
      }

    // console.log("The event value is this : ", $event);
    // // this.userList.push({
    // //   userName : $event.userName,
    // //   userEmail : $event.userEmail
    // // });
    // let localStorageValue : any = localStorage.getItem("userList");
    // console.log("The localStorageValue is this : ", localStorageValue)
    // this.userList = JSON.parse(<any>localStorage?.getItem("userList"));
    // this.noData = false; 
    // console.log("The value of the data is this : ", JSON.parse(<any>localStorage?.getItem("userData")))
    // console.log("And the array value is this : ", this.userList)
  } 
  test() {
    // localStorage.setItem('token','xhja787'); // This creates a key value pair in local storage.
    // localStorage.setItem('test','xhja787'); // This creates a key value pair in local storage.
    // let data = localStorage.getItem('userData'); // This method is used to get the value from the local storage using the key.
    // console.log("The value from the local storage is this : ", data);
    // localStorage.removeItem('token'); // To remove as specific data from the local storage use this method.
    // localStorage.clear() // Use this method to remove all the data from the local storage.
  }
  async deleteTeamOrOrganisation(data: any) {
    if (this.listType == "Team") {
    let todoDeleteApi = await this.api.teamDeleteApi(data._id).pipe(
      map((response: any) => {
        console.log("queries.component.ts says that response is this : ", response);
        // this.requestList = response?.data;
        // this.noData = response?.data.length === 0 ? true : false; 

        // this.noData = response.data.length === 0 ? true : false;
        // this.taskList = response?.data
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
    } else {
      let todoDeleteApi = await this.api.organisationDeleteApi(data._id).pipe(
        map((response: any) => {
          console.log("queries.component.ts says that response is this : ", response);
          // this.requestList = response?.data;
          // this.noData = response?.data.length === 0 ? true : false; 
  
          // this.noData = response.data.length === 0 ? true : false;
          // this.taskList = response?.data
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
    }
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
  }
}
