import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-query-model',
  templateUrl: './add-query-model.component.html',
  styleUrls: ['./add-query-model.component.css']
})
export class AddQueryModelComponent {
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

  giveInputValue() : any {
    this.requestNumber = Math.floor(Math.random() * 9000) + 1000;
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
