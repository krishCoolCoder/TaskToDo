import { Component,OnInit,OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from '../service/api.service';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css']
})
export class QueriesComponent implements OnInit, OnChanges {
  isEdit : boolean = false;

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

  queryList : any = [
  ];
  queryData: any ;
  noData : boolean = false;

  constructor ( private api: ApiService ) {}
  
  ngOnInit(): void {
    let queryListApi = this.api.queryListApi().pipe(
      map((response: any) => {
        console.log("queries.component.ts says that response is this : ", response);
        this.queryList = response?.data;
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

    // this.queryList = JSON.parse(<any>localStorage.getItem('queryList'));
    // this.noData = this.queryList.length === 0 ? true : false; 

    // let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    // this.queryList = JSON.parse(<any>localStorage.getItem('queryList'));
    // console.log("The queryList before filter is this : ", this.queryList);
    // this.queryList = this.queryList.filter((data:any)=>{
    //   return ((data.organisationRef == organisationTeamMapping.currentOrganisation) && (data.currentTeamRef == organisationTeamMapping.currentTeam))
    // })
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.queryList = JSON.parse(<any>localStorage.getItem('queryList'));
    this.noData = this.queryList.length === 0 ? true : false; 

    let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    this.queryList = JSON.parse(<any>localStorage.getItem('queryList'));
    console.log("The queryList before filter is this : ", this.queryList);
    this.queryList = this.queryList.filter((data:any)=>{
      return ((data.organisationRef == organisationTeamMapping.currentOrganisation) && (data.currentTeamRef == organisationTeamMapping.currentTeam))
    })
  }
  async getInputValue ($event: any) {
    console.log("Calling all autobots : ")
    let queryListApi = await this.api.queryListApi().pipe(
      map((response: any) => {
        console.log("queries.component.ts says that response is this : ", response);
        this.queryList = response?.data;
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
    // let queryListData = JSON.parse(<any>localStorage.getItem('queryList'));
    // this.queryList = queryListData;
    // console.log("The queryList is this : ", this.queryList)
    // this.noData = this.queryList.length === 0 ? true : false; 

    // let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    // console.log("The queryList before filter is this : ", this.queryList);
    // this.queryList = this.queryList.filter((data:any)=>{
    //   return ((data.organisationRef == organisationTeamMapping.currentOrganisation) && (data.currentTeamRef == organisationTeamMapping.currentTeam))
    // })
  } 
  async deleteQuery(data: any) {
    if(!data?.id){

      let queryDeleteApi = await this.api.queryDeleteApi(data?._id).pipe(
        map((response: any) => {
          console.log("queries.component.ts says that response is this : ", response);
          this.queryList = response?.data;
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
      } else {
        alert("Delete operation failed.")
      }
      let queryListApi = await this.api.queryListApi().pipe(
        map((response: any) => {
          console.log("queries.component.ts says that response is this : ", response);
          this.queryList = response?.data;
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
    // let queryListData = JSON.parse(<any>localStorage.getItem('queryList'));
    // let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    // queryListData.splice(data,1);
    // this.queryList = queryListData;
    // queryListData = this.queryList.filter((data:any)=>{
    //   return ((data.organisationRef == organisationTeamMapping.currentOrganisation) && (data.currentTeamRef == organisationTeamMapping.currentTeam))
    // });
    // this.queryList = queryListData;
    // localStorage.setItem('queryList',JSON.stringify(queryListData))
    // this.noData = this.queryList.length === 0 ? true : false; 
    }
  editQuery(data: any, flag: boolean) {
    this.queryData = data;
    this.isEdit = flag;
    // console.log("Into the editQuery and the data is this : ", data);

    // let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    // this.queryList = JSON.parse(<any>localStorage.getItem('queryList'));
    // console.log("The queryList before filter is this : ", this.queryList);
    // this.queryList = this.queryList.filter((data:any)=>{
    //   return ((data.organisationRef == organisationTeamMapping.currentOrganisation) && (data.currentTeamRef == organisationTeamMapping.currentTeam))
    // })
  }
  getDataFromHeader($event : any) {
    console.log("Into the headerData and the headerData is this : ");
    let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    this.queryList = JSON.parse(<any>localStorage.getItem('queryList'));
    console.log("The queryList before filter is this : ", this.queryList);
    this.queryList = this.queryList.filter((data:any)=>{
      return ((data.organisationRef == organisationTeamMapping.currentOrganisation) && (data.currentTeamRef == organisationTeamMapping.currentTeam))
    })
    console.log("The queryList after filter is this : ", this.queryList)
    // organisationRef : organisationTeamMapping.currentOrganisation,
    //             currentTeamRef : organisationTeamMapping.currentTeam
  }
}
