import { Component,OnInit,OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css']
})
export class QueriesComponent implements OnInit, OnChanges {
  queryList : any = [
  ];
  noData : boolean = false;
  ngOnInit(): void {
    this.queryList = JSON.parse(<any>localStorage.getItem('queryList'));
    this.noData = this.queryList.length === 0 ? true : false; 
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.queryList = JSON.parse(<any>localStorage.getItem('queryList'));
    this.noData = this.queryList.length === 0 ? true : false; 
  }
  getInputValue ($event: any) {
    let queryListData = JSON.parse(<any>localStorage.getItem('queryList'));
    this.queryList = queryListData;
    console.log("The queryList is this : ", this.queryList)
    this.noData = this.queryList.length === 0 ? true : false; 
  } 
  deleteUser(data: any) {
    let queryListData = JSON.parse(<any>localStorage.getItem('queryList'));
    queryListData.splice(data,1);
    this.queryList = queryListData;
    localStorage.setItem('queryList',JSON.stringify(queryListData))
    this.noData = this.queryList.length === 0 ? true : false; 
    }
}
