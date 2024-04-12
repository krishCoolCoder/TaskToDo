import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../service/api.service';
import { catchError, map } from 'rxjs/operators';
import { ApiCall } from '../dependancy/apiService.service';
import { FilterService } from '../service/filter.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit, OnChanges {
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
  requestList : any = [
  ];
  requestData : any;
  noData : boolean = false;
  isEdit ?: boolean = false;

  constructor ( 
    private api: ApiService, 
    private testApi : ApiCall,
    private filter : FilterService, ) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    this.requestList = localStorage.getItem('requestList');
    console.log("The ngOnChanges method has been called and the user Data is this : ", this.requestData)
    this.noData = this.requestList.length === 0 ? true : false; 

    let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    this.requestList = this.requestList.filter((data:any)=>{
      return ((data.organisationRef == organisationTeamMapping.currentOrganisation) && (data.currentTeamRef == organisationTeamMapping.currentTeam))
    })
  }
  async ngOnInit(): Promise<any> {
    let requestListApi : any = await this.testApi.requestListApi(!this.filter.isHeaderFilterEmpty() ? this.filter.getAllHeaderFilter() : null);
    console.log("The requestList data is this : ", requestListApi)
    this.requestList = requestListApi;
    this.noData = requestListApi?.length === 0 ? true : false; 
    // this.requestList = JSON.parse(<any>localStorage.getItem('requestList'));
    // this.noData = this.requestList.length === 0 ? true : false;
    // // this.userList.review = this.userList.performance === 0 ? "Lets see" : (this.userList.performance < 50 && this.userList.performance > 60 ) ? "Good" : ((this.userList.performance < 60 && this.userList.performance > 100)) ? "Very good" : "Satifactory";
    // console.log("The ngOnInit is being called and the value is : ", this.requestList)
    // this.noData = this.requestList.length === 0 ? true : false; 

    // let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    // this.requestList = this.requestList.filter((data:any)=>{
    //   return ((data.organisationRef == organisationTeamMapping.currentOrganisation) && (data.currentTeamRef == organisationTeamMapping.currentTeam))
    // })
    // throw new Error('Method not implemented.');
  }
  async getInputValue ($event: any) {
    let requestListApi : any = await this.testApi.requestListApi(!this.filter.isHeaderFilterEmpty() ? this.filter.getAllHeaderFilter() : null);
    this.requestList = requestListApi;
    this.noData = requestListApi?.length === 0 ? true : false; 
    // let requestListApi = await this.api.requestListApi().pipe(
    //   map((response: any) => {
    //     console.log("queries.component.ts says that response is this : ", response);
    //     this.requestList = response?.data;
    //     this.noData = response?.data.length === 0 ? true : false; 

    //     // this.noData = response.data.length === 0 ? true : false;
    //     // this.taskList = response?.data
    //     return response; // Forward the response to the next operator
    //   }),
    //   catchError((error) => {
    //     // Handle error response here
    //     console.error('API Error:', error);
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
    // console.log("The event value is this : ", $event);
    // // this.requestList.push(Object($event));
    // this.requestList = JSON.parse(<any>localStorage.getItem('requestList'));
    // console.log("And the array value is this : ", this.requestList)
    // this.noData = this.requestList.length === 0 ? true : false; 

    // let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    // this.requestList = this.requestList.filter((data:any)=>{
    //   return ((data.organisationRef == organisationTeamMapping.currentOrganisation) && (data.currentTeamRef == organisationTeamMapping.currentTeam))
    // })
  } 
  async deleteRequest(data: any) {
    let requestDeleteApi = await this.testApi.requestDeleteApi(data._id);
      let requestListApi : any = await this.testApi.requestListApi(!this.filter.isHeaderFilterEmpty() ? this.filter.getAllHeaderFilter() : null);
      this.requestList = requestListApi;
      this.noData = requestListApi.length === 0 ? true : false; 
    }
  editRequest(data: any, flag: boolean) {
    this.requestData = data;
    this.isEdit = flag;
  }
  async getDataFromHeader($event : any) {
    console.log("Into the getDataFromHeader ")
    let requestListApi : any = await this.testApi.requestListApi(!this.filter.isHeaderFilterEmpty() ? this.filter.getAllHeaderFilter() : null);
      this.requestList = requestListApi;
      this.noData = requestListApi.length === 0 ? true : false; 
  }
}
