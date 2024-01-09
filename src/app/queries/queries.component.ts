import { Component } from '@angular/core';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css']
})
export class QueriesComponent {
  requestList : any = [
  ];
  getInputValue ($event: any) {
    console.log("The event value is this : ", $event);
    this.requestList.push(Object($event));
    console.log("And the array value is this : ", this.requestList)
  } 
}
