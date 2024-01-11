import { Component } from '@angular/core';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent {

  requestList : any = [
  ];
  getInputValue ($event: any) {
    console.log("The event value is this : ", $event);
    this.requestList.push(Object($event));
    console.log("And the array value is this : ", this.requestList)
  } 
}
