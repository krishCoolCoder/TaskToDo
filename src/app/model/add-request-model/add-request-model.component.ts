import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-request-model',
  templateUrl: './add-request-model.component.html',
  styleUrls: ['./add-request-model.component.css']
})
export class AddRequestModelComponent {
  @Output()
  inputValue : any = new EventEmitter<string>();

  // task : any = {
  //   taskNo : 0,
  //   title : "",
  //   description : ""
  // }

  requestNumber : any = 0;
  requestTitle: string = "";
  requestDescription : string = "";
  requestType : string | undefined | null = '';
  requestStatus ?: string | undefined | null = '';

  // ngOnInit() : void {
  //   this.task = {
  //     taskNo: 0,
  //     title: "",
  //     description: ""
  //   }
  // }

  formTitle(event: any) : any {
    this.requestTitle = event?.target.value;
  }
  formDescription(event: any) : any {
    this.requestDescription = event?.target.value;
  }

  updateStatus(value: any): any {
    console.log("The value is this : ", value.target  as HTMLParagraphElement);
    let data =  value.target  as HTMLParagraphElement;
    this.requestStatus = data.textContent;
    console.log("The vlue isss : ", this.requestStatus, " and the data is this : ", data)
  }
  updateType(value: any): any {
    console.log("The value is this : ", value.target  as HTMLParagraphElement);
    let data =  value.target  as HTMLParagraphElement;
    this.requestType = data.textContent;
    console.log("The vlue isss : ", this.requestStatus, " and the data is this : ", data)
  }

  giveInputValue() : any {
    this.requestNumber = Math.floor(Math.random() * 9000) + 1000;
    let requestList = JSON.parse(<any>localStorage.getItem('requestList'));
    let loggedInUserData = JSON.parse(<any>localStorage.getItem('loggedInUser'))
    requestList.push(
      {
        requestNumber : this.requestNumber,
        requestTitle: this.requestTitle,
        requestDescription : this.requestDescription,
        requestStatus : this.requestStatus == '' ? "Unknown request raised" : this.requestStatus ,
        requestType : this.requestType == '' ? "Request Raised" : this.requestType ,
        requestCreatedBy : loggedInUserData.userName
      }
    )
    localStorage.setItem('requestList',JSON.stringify(requestList));
    this.inputValue.emit({
      requestNumber : this.requestNumber,
      requestTitle: this.requestTitle,
      requestDescription : this.requestDescription,
      requestStatus : this.requestStatus == '' ? "Unknown request raised" : this.requestStatus 
    });
    this.requestDescription="";
    this.requestTitle="";
    this.requestNumber=0;
  }

}
