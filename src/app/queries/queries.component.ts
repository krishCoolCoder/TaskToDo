import { Component,OnInit,OnChanges, SimpleChanges } from '@angular/core';

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
  ngOnInit(): void {
    this.queryList = JSON.parse(<any>localStorage.getItem('queryList'));
    this.noData = this.queryList.length === 0 ? true : false; 

    let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    this.queryList = JSON.parse(<any>localStorage.getItem('queryList'));
    console.log("The queryList before filter is this : ", this.queryList);
    this.queryList = this.queryList.filter((data:any)=>{
      return ((data.organisationRef == organisationTeamMapping.currentOrganisation) && (data.currentTeamRef == organisationTeamMapping.currentTeam))
    })
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
  getInputValue ($event: any) {
    let queryListData = JSON.parse(<any>localStorage.getItem('queryList'));
    this.queryList = queryListData;
    console.log("The queryList is this : ", this.queryList)
    this.noData = this.queryList.length === 0 ? true : false; 

    let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    console.log("The queryList before filter is this : ", this.queryList);
    this.queryList = this.queryList.filter((data:any)=>{
      return ((data.organisationRef == organisationTeamMapping.currentOrganisation) && (data.currentTeamRef == organisationTeamMapping.currentTeam))
    })
  } 
  deleteQuery(data: any) {
    let queryListData = JSON.parse(<any>localStorage.getItem('queryList'));
    let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    queryListData.splice(data,1);
    this.queryList = queryListData;
    queryListData = this.queryList.filter((data:any)=>{
      return ((data.organisationRef == organisationTeamMapping.currentOrganisation) && (data.currentTeamRef == organisationTeamMapping.currentTeam))
    });
    this.queryList = queryListData;
    localStorage.setItem('queryList',JSON.stringify(queryListData))
    this.noData = this.queryList.length === 0 ? true : false; 
    }
  editQuery(data: any, flag: boolean) {
    this.queryData = data;
    this.isEdit = flag;
    console.log("Into the editQuery and the data is this : ", data);

    let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    this.queryList = JSON.parse(<any>localStorage.getItem('queryList'));
    console.log("The queryList before filter is this : ", this.queryList);
    this.queryList = this.queryList.filter((data:any)=>{
      return ((data.organisationRef == organisationTeamMapping.currentOrganisation) && (data.currentTeamRef == organisationTeamMapping.currentTeam))
    })
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
