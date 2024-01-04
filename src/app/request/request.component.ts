import { Component } from '@angular/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent {
  requestList : any = [
  ];
  getInputValue ($event: any) {
    console.log("The event value is this : ", $event);
    this.requestList.push(Object($event));
    console.log("And the array value is this : ", this.requestList)
  } 
}
