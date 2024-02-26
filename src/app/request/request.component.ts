import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

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
  ngOnChanges(changes: SimpleChanges): void {
    this.requestList = localStorage.getItem('requestList');
    console.log("The ngOnChanges method has been called and the user Data is this : ", this.requestData)
    this.noData = this.requestList.length === 0 ? true : false; 

    let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    this.requestList = this.requestList.filter((data:any)=>{
      return ((data.organisationRef == organisationTeamMapping.currentOrganisation) && (data.currentTeamRef == organisationTeamMapping.currentTeam))
    })
  }
  ngOnInit(): void {
    this.requestList = JSON.parse(<any>localStorage.getItem('requestList'));
    this.noData = this.requestList.length === 0 ? true : false;
    // this.userList.review = this.userList.performance === 0 ? "Lets see" : (this.userList.performance < 50 && this.userList.performance > 60 ) ? "Good" : ((this.userList.performance < 60 && this.userList.performance > 100)) ? "Very good" : "Satifactory";
    console.log("The ngOnInit is being called and the value is : ", this.requestList)
    this.noData = this.requestList.length === 0 ? true : false; 

    let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    this.requestList = this.requestList.filter((data:any)=>{
      return ((data.organisationRef == organisationTeamMapping.currentOrganisation) && (data.currentTeamRef == organisationTeamMapping.currentTeam))
    })
    // throw new Error('Method not implemented.');
  }
  getInputValue ($event: any) {
    console.log("The event value is this : ", $event);
    // this.requestList.push(Object($event));
    this.requestList = JSON.parse(<any>localStorage.getItem('requestList'));
    console.log("And the array value is this : ", this.requestList)
    this.noData = this.requestList.length === 0 ? true : false; 

    let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    this.requestList = this.requestList.filter((data:any)=>{
      return ((data.organisationRef == organisationTeamMapping.currentOrganisation) && (data.currentTeamRef == organisationTeamMapping.currentTeam))
    })
  } 
  deleteRequest(data: any) {
    let requestListData = JSON.parse(<any>localStorage.getItem('requestList'));
    let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    
    requestListData.splice(data,1);
    this.requestList = this.requestList.filter((data:any)=>{
      return ((data.organisationRef == organisationTeamMapping.currentOrganisation) && (data.currentTeamRef == organisationTeamMapping.currentTeam))
    })
    localStorage.setItem('requestList',JSON.stringify(requestListData))
    this.noData = this.requestList.length === 0 ? true : false; 
    }
  editRequest(data: any, flag: boolean) {
    this.requestData = data;
    this.isEdit = flag;
  }
  getDataFromHeader($event : any) {
    console.log("Into the headerData and the headerData is this : ");
    let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    this.requestList = JSON.parse(<any>localStorage.getItem('requestList'));
    console.log("The requestList before filter is this : ", this.requestList)
    this.requestList = this.requestList.filter((data:any)=>{
      return ((data.organisationRef == organisationTeamMapping.currentOrganisation) && (data.currentTeamRef == organisationTeamMapping.currentTeam))
    })
    console.log("The requestList after filter is this : ", this.requestList)
    // organisationRef : organisationTeamMapping.currentOrganisation,
    //             currentTeamRef : organisationTeamMapping.currentTeam
  }
}
