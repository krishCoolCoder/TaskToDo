import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-query-model',
  templateUrl: './add-query-model.component.html',
  styleUrls: ['./add-query-model.component.css']
})
export class AddQueryModelComponent {
  @ViewChild('myForm')
  myForm!: NgForm;
  @ViewChild('queryTitleField')
  queryTitleField!: ElementRef;
  @ViewChild('queryDescriptionField')
  queryDescriptionField!: ElementRef;
  
  @Output()
  inputValue : any = new EventEmitter<string>();

  // task : any = {
  //   taskNo : 0,
  //   title : "",
  //   description : ""
  // }

  queryNumber : any = 0;
  queryTitle: string = "";
  queryDescription : string = "";
  queryStatus ?: string | undefined | null = '';

  // ngOnInit() : void {
  //   this.task = {
  //     taskNo: 0,
  //     title: "",
  //     description: ""
  //   }
  // }

  formTitle(event: any) : any {
    this.queryTitle = event?.target.value;
  }
  formDescription(event: any) : any {
    this.queryDescription = event?.target.value;
  }

  updateStatus(value: any): any {
    console.log("The value is this : ", value.target  as HTMLParagraphElement);
    let data =  value.target  as HTMLParagraphElement;
    this.queryStatus = data.textContent;
    console.log("The vlue isss : ", this.queryStatus, " and the data is this : ", data)
  }

  giveInputValue() : any {
    this.queryNumber = Math.floor(Math.random() * 9000) + 1000;
    let queryListValues = JSON.parse(<any>localStorage.getItem('queryList'));
    let loggedInUserData = JSON.parse(<any>localStorage.getItem('loggedInUser'))
    queryListValues.push({
      queryNumber : this.queryNumber,
      queryTitle: this.queryTitle,
      queryDescription : this.queryDescription,
      queryStatus : this.queryStatus == '' ? "Unknown query raised" : this.queryStatus,
      queryCreatedBy : loggedInUserData.userName
    });
    localStorage.setItem('queryList',JSON.stringify(queryListValues));
    this.inputValue.emit({
      queryNumber : this.queryNumber,
      queryTitle: this.queryTitle,
      queryDescription : this.queryDescription,
      queryStatus : this.queryStatus == '' ? "Unknown query raised" : this.queryStatus 
    });
    this.queryDescription="";
    this.queryTitle="";
    this.queryNumber=0;
    this.queryTitleField.nativeElement.value = '';
    this.queryDescriptionField.nativeElement.value = '';
    this.myForm.resetForm();
  }
  
  onSubmit() {
    this.queryTitleField.nativeElement.value = '';
    this.queryDescriptionField.nativeElement.value = '';
    this.myForm.resetForm();
  }
}
