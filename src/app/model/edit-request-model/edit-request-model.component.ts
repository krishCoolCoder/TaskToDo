import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { catchError, map } from 'rxjs/operators';
import { FilterService } from 'src/app/service/filter.service';

@Component({
  selector: 'app-edit-request-model',
  templateUrl: './edit-request-model.component.html',
  styleUrls: ['./edit-request-model.component.css']
})
export class EditRequestModelComponent implements OnInit, OnChanges {
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

  constructor ( private api: ApiService, private filter : FilterService ) {}

  ngOnInit() : void {
    console.log("The value of inputValue in ngOnInit() child component is this : ",this.inputValue, " and the isEdit is this : ", this.isEdit)
    this.requestNumber = this.inputValue.requestNumber;
    this.requestTitle = this.inputValue.requestTitle;
    this.requestDescription = this.inputValue.requestDescription;
    this.requestType = this.inputValue.requestType;
    this.requestStatus = this.inputValue.requestStatus;
    this.editView = true;
    if (this.isEdit === true) {
    if (this.inputValue) {
  }
} else if (this.isEdit === false) {
  // console.log('Into the else if on false on ngOnInit');
  // this.requestNumber = '';
  // this.requestTitle = '';
  // this.requestDescription = '';
  // this.requestType = "Access Control";
  // this.requestStatus = "Request Raised";
  }
  }

  ngOnChanges(changes: SimpleChanges): void {
    try {
      this.requestNumber = this.inputValue.requestNumber;
      this.requestTitle = this.inputValue.requestTitle;
      this.requestTitleField.nativeElement.value = this.inputValue.requestTitle || "";
      this.requestDescriptionField.nativeElement.value = this.inputValue.requestDescription || "";
      this.requestDescription = this.inputValue.requestDescription;
      this.requestType = this.inputValue.requestType;
      this.requestStatus = this.inputValue.requestStatus;
      this.editView = true;
      if (this.isEdit === true) {
        if (this.inputValue) {
          console.log('Into the if on true on ngOnChanges');
        }
      } else if (this.isEdit === false) {
        console.log('Into the else if on false on ngOnChanges');
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

  async giveInputValue() : Promise<any> {
    console.log("All query data from request model is this : ", this.filter.getAllHeaderFilter(),  " and the payload is this : ", {
      requestTitle: this.requestTitle,
      requestDescription: this.requestDescription,
      requestStatus: this.requestStatus,
      requestType: this.requestType,
      requestProjectRef : this.filter.getProjectId(),
      requestTeamRef : this.filter.getTeamId(),
      requestOrganisationRef : this.filter.getOrganisationId(),
  })

        let queryListApi = await this.api.requestUpdateApi(
          {
            id : this.inputValue._id,
            requestTitle: this.requestTitle,
            requestDescription: this.requestDescription,
            requestStatus: this.requestStatus,
            requestType: this.requestType,
            requestProjectRef : this.filter.getProjectId(),
            requestTeamRef : this.filter.getTeamId(),
            requestOrganisationRef : this.filter.getOrganisationId(),
        }
        ).pipe(
          map((response: any) => {
            console.log("add-query-model.component.ts says that response is this : ", response);
            // this.noData = response.data.length === 0 ? true : false;
            // this.taskList = response?.data
            this.outputValue.emit({data:"response"});
            return response; // Forward the response to the next operator
          }),
          catchError((error) => {
            // Handle error response here
            console.error('API Error:', error);
            alert(error.error.message || error.statusText)
            this.outputValue.emit({data:"response"});
            throw error; // Re-throw the error to propagate it
            // Alternatively, you can return a default value or another Observable here
            // return of(defaultValue); // Return a default value
            // return throwError('Error occurred'); // Return another Observable
          })
        ).subscribe({
            next: (data) => {
              console.log('API Response:', data);
              // this.loader = false;
              // Handle the response data here
            },
            error: (error) => {
              console.error('API Error:', error);
              // this.loader = false;
              // Handle any errors here
            }
          });
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