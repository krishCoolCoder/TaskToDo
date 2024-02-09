import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-request-model',
  templateUrl: './add-request-model.component.html',
  styleUrls: ['./add-request-model.component.css']
})
export class AddRequestModelComponent implements OnInit, OnChanges {
  @ViewChild('myForm')
  myForm!: NgForm;
  @ViewChild('requestTitleField')
  requestTitleField!: ElementRef;
  @ViewChild('requestDescriptionField')
  requestDescriptionField!: ElementRef;
  @Output()
  outputValue : any = new EventEmitter<string>();
  @Input()
  inputValue: any;

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

  ngOnInit() : void {
    if (this.inputValue) {
    this.requestNumber = this.inputValue.requestNumber;
    this.requestTitle = this.inputValue.requestTitle;
    this.requestDescription = this.inputValue.requestDescription;
    this.requestType = this.inputValue.requestType;
    this.requestStatus = this.inputValue.requestStatus;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    try {
      this.requestTitleField.nativeElement.value = this.inputValue.requestTitle || "";
      this.requestDescriptionField.nativeElement.value = this.inputValue.requestDescription || "";
      if (this.inputValue) {
        this.requestNumber = this.inputValue.requestNumber;
        this.requestTitle = this.inputValue.requestTitle;
        this.requestDescription = this.inputValue.requestDescription;
        this.requestType = this.inputValue.requestType;
        this.requestStatus = this.inputValue.requestStatus;
      }
    } catch (error) {
      console.log("The error is in ngOnChange() in model : ", error)
    }
  }

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
    console.log("whatttt")
    console.log("Actual value of inputvlaue ", this.inputValue)
    console.log("whatttt")
    if (this.inputValue) {
      let requestNumber = this.inputValue.requestNumber;
      let requestType = this.inputValue.requestType;
      let filteredData = requestList.forEach((data: any, index: number)=> {
        if (data.requestNumber === requestNumber) {
          requestList[index] = {
            requestNumber : requestNumber,
            requestTitle: this.requestTitle,
            requestDescription : this.requestDescription,
            requestStatus : requestType == '' ? "Unknown request raised" : requestType ,
            requestType : requestType == '' ? "Request Raised" : requestType ,
            requestCreatedBy : loggedInUserData.userName
          };
          localStorage.setItem('requestList',JSON.stringify(requestList));
          this.outputValue.emit({
            requestNumber : this.inputValue.requestNumber,
            requestTitle: this.inputValue.requestTitle,
            requestDescription : this.inputValue.requestDescription,
            requestStatus : requestType == '' ? "Unknown request raised" : requestType ,
            requestType : requestType == '' ? "Request Raised" : requestType ,
            requestCreatedBy : loggedInUserData.userName
          });
        } 
      });
      this.inputValue = null;
      this.requestTitle = "";
      this.requestDescription = ""; 
      this.requestTitleField.nativeElement.value = "";
      this.requestDescriptionField.nativeElement.value = "";
      this.myForm.resetForm();
      return;
    }
    console.log("After the if for editing")
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
    this.outputValue.emit({
      requestNumber : this.requestNumber,
      requestTitle: this.requestTitle,
      requestDescription : this.requestDescription,
      requestStatus : this.requestStatus == '' ? "Unknown request raised" : this.requestStatus 
    });
    this.requestDescription="";
    this.requestTitle="";
    this.requestNumber=0;
    this.requestTitleField.nativeElement.value = "";
    this.requestDescriptionField.nativeElement.value = "";
  }
  
  onSubmit() {
    this.requestTitleField.nativeElement.value = "";
    this.requestDescriptionField.nativeElement.value = "";
    this.myForm.resetForm();
  }

}
