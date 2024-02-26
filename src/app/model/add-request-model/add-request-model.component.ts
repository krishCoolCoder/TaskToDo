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
  @Input()
  isEdit?: boolean;

  editView : boolean = false;

  requestNumber : any = 0;
  requestTitle: string = "";
  requestDescription : string = "";
  requestType : string | undefined | null = '';
  requestStatus ?: string | undefined | null = '';

  ngOnInit() : void {
    console.log("The value of inputValue in ngOnInit() child component is this : ",this.inputValue, " and the isEdit is this : ", this.isEdit)
    if (this.isEdit === true) {
    if (this.inputValue) {
    this.requestNumber = this.inputValue.requestNumber;
    this.requestTitle = this.inputValue.requestTitle;
    this.requestDescription = this.inputValue.requestDescription;
    this.requestType = this.inputValue.requestType;
    this.requestStatus = this.inputValue.requestStatus;
    this.editView = true;
  }
} else if (this.isEdit === false) {
  console.log('Into the else if on false on ngOnInit');
  this.requestNumber = '';
  this.requestTitle = '';
  this.requestDescription = '';
  this.requestType = "Access Control";
  this.requestStatus = "Request Raised";
  }
  }

  ngOnChanges(changes: SimpleChanges): void {
    try {
      if (this.isEdit === true) {
        if (this.inputValue) {
          console.log('Into the if on true on ngOnChanges');
          this.requestNumber = this.inputValue.requestNumber;
          this.requestTitle = this.inputValue.requestTitle;
          this.requestTitleField.nativeElement.value = this.inputValue.requestTitle || "";
          this.requestDescriptionField.nativeElement.value = this.inputValue.requestDescription || "";
          this.requestDescription = this.inputValue.requestDescription;
          this.requestType = this.inputValue.requestType;
          this.requestStatus = this.inputValue.requestStatus;
          this.editView = true;
        }
      } else if (this.isEdit === false) {
        console.log('Into the else if on false on ngOnChanges');
      this.requestTitleField.nativeElement.value = "";
      this.requestDescriptionField.nativeElement.value = "";
      this.requestNumber = '';
      this.requestTitle = '';
      this.requestDescription = '';
      this.requestType = "Access Control";
      this.requestStatus = "Request Raised";
      this.editView = false;
    
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
    let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    console.log("The organisationTeamMapping is this : ", organisationTeamMapping.currentOrganisation, " and ",organisationTeamMapping.currentTeam)
    if (organisationTeamMapping === null || organisationTeamMapping.currentTeam === undefined || organisationTeamMapping.currentOrganisation === undefined ) {
      alert("Kindly select organisation/account type and team.");
      return;
    }
    let loggedInUserData = JSON.parse(<any>localStorage.getItem('loggedInUser'))
    if (this.isEdit === true) {
    if (this.inputValue) {
      this.editView = false;
      let requestNumber = this.inputValue.requestNumber;
      let requestType = this.inputValue.requestType;
      let filteredData = requestList.forEach((data: any, index: number)=> {
        if (data.requestNumber === requestNumber) {
          requestList[index] = {
            requestNumber : requestNumber,
            requestTitle: this.requestTitle,
            requestDescription : this.requestDescription,
            requestType : this.inputValue.requestStatus == '' ? "Access Control" : this.inputValue.requestStatus ,
            requestStatus : requestType == '' ? "Request Raised" : requestType ,
            requestCreatedBy : loggedInUserData.userName,
            organisationRef : organisationTeamMapping.currentOrganisation,
            currentTeamRef : organisationTeamMapping.currentTeam
          };
          localStorage.setItem('requestList',JSON.stringify(requestList));
          this.outputValue.emit({
            requestNumber : this.inputValue.requestNumber,
            requestTitle: this.inputValue.requestTitle,
            requestDescription : this.inputValue.requestDescription,
            requestType : this.inputValue.requestStatus == '' ? "Access Control" : this.inputValue.requestStatus ,
            requestStatus : requestType == '' ? "Request Raised" : requestType ,
            requestCreatedBy : loggedInUserData.userName,
            organisationRef : organisationTeamMapping.currentOrganisation,
            currentTeamRef : organisationTeamMapping.currentTeam
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
  }
    console.log("After the if for editing")
    requestList.push(
      {
        requestNumber : this.requestNumber,
        requestTitle: this.requestTitle,
        requestDescription : this.requestDescription,
        requestStatus : this.requestStatus == '' ? "Request Raised" : this.requestStatus ,
        requestType : this.requestStatus == '' ? "Access Control" : this.requestStatus ,
        requestCreatedBy : loggedInUserData.userName,
        organisationRef : organisationTeamMapping.currentOrganisation,
        currentTeamRef : organisationTeamMapping.currentTeam
      }
    )
    localStorage.setItem('requestList',JSON.stringify(requestList));
    this.outputValue.emit({
      requestNumber : this.requestNumber,
      requestTitle: this.requestTitle,
      requestDescription : this.requestDescription,
      requestStatus : this.requestStatus == '' ? "Request Raised" : this.requestStatus,
      organisationRef : organisationTeamMapping.currentOrganisation,
      currentTeamRef : organisationTeamMapping.currentTeam
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
  onModalClose() {
    // Handle the modal close event here
    console.log('Modal closed');
    // Add your logic here
    this.editView = false;
    console.log("Into the onModelClose() and the inputValue is this : ", this.inputValue)
    if (this.isEdit === false) {
    this.inputValue = null;
    this.requestTitle = "";
    this.requestDescription = ""; 
    this.requestTitleField.nativeElement.value = "";
    this.requestDescriptionField.nativeElement.value = "";
    // this.myForm.resetForm();
    }
  }
}
