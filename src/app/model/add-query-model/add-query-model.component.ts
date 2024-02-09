import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-query-model',
  templateUrl: './add-query-model.component.html',
  styleUrls: ['./add-query-model.component.css']
})
export class AddQueryModelComponent implements OnInit, OnChanges{
  @ViewChild('myForm')
  myForm!: NgForm;
  @ViewChild('queryTitleField')
  queryTitleField!: ElementRef;
  @ViewChild('queryDescriptionField')
  queryDescriptionField!: ElementRef;
  @Input()
  inputValue: any;
  
  @Output()
  outputValue : any = new EventEmitter<string>();

  // task : any = {
  //   taskNo : 0,
  //   title : "",
  //   description : ""
  // }

  queryNumber : any = 0;
  queryTitle: string = "";
  queryDescription : string = "";
  queryStatus ?: string | undefined | null = '';

  ngOnInit() : void {
    console.log("Into the ngOnInit : ")
    if (this.inputValue) {
      console.log("Into the ngOnInit and into the if ")
    this.queryNumber = this.inputValue.queryNumber;
    this.queryTitle = this.inputValue.queryTitle;
    this.queryDescription = this.inputValue.queryDescription;
    this.queryStatus = this.inputValue.queryStatus;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    try {
      this.queryTitleField.nativeElement.value = this.inputValue.queryTitle || '';
      this.queryDescriptionField.nativeElement.value = this.inputValue.queryDescription || '';
      console.log("Intot he ngOnChanges : ")
      if (this.inputValue) {
        console.log("Into the ngOnChanges and into the if : ")
        this.queryNumber = this.inputValue.queryNumber;
        this.queryTitle = this.inputValue.queryTitle;
        this.queryDescription = this.inputValue.queryDescription;
        this.queryStatus = this.inputValue.queryStatus;
      }
    } catch (error) {
      console.log("The error is in ngOnChange() in model : ", error)
    }
  }

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

    console.log("whatttt")
    console.log("Actual value of inputvlaue ", this.inputValue)
    console.log("whatttt")
    if (this.inputValue) {
      console.log("Into the if on giveInputValue and the this.queryTitle is this : ", this.queryTitle)
      let filteredData = queryListValues.forEach((data: any, index: number)=> {
        if (data.queryNumber === this.inputValue.queryNumber) {
          queryListValues[index] = {
            queryNumber : this.inputValue.queryNumber,
            queryTitle: this.queryTitle,
            queryDescription : this.queryDescription,
            queryStatus : this.inputValue.queryStatus == '' ? "Unknown query raised" : this.inputValue.queryStatus,
            queryCreatedBy : loggedInUserData.userName
          };
          localStorage.setItem('queryList',JSON.stringify(queryListValues));
          this.outputValue.emit({
            queryNumber : this.inputValue.queryNumber,
            queryTitle: this.queryTitle,
            queryDescription : this.inputValue.queryDescription,
            queryStatus : this.inputValue.queryStatus == '' ? "Unknown query raised" : this.inputValue.queryStatus,
            queryCreatedBy : loggedInUserData.userName
          });
        } 
      });
      this.inputValue = null;
      this.queryTitleField.nativeElement.value = '';
      this.queryDescriptionField.nativeElement.value = '';
      this.queryTitle = '';
      this.queryDescription = '';
      // this.myForm.resetForm();
      return;
    }
    console.log("After the if for editing")

    queryListValues.push({
      queryNumber : this.queryNumber,
      queryTitle: this.queryTitle,
      queryDescription : this.queryDescription,
      queryStatus : this.queryStatus == '' ? "Unknown query raised" : this.queryStatus,
      queryCreatedBy : loggedInUserData.userName
    });
    localStorage.setItem('queryList',JSON.stringify(queryListValues));
    this.outputValue.emit({
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
    // this.myForm.resetForm();
  }
  
  onSubmit() {
    this.queryTitleField.nativeElement.value = '';
    this.queryDescriptionField.nativeElement.value = '';
    // this.myForm.resetForm();
  }
}
