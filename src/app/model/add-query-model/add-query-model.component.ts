import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { catchError, map } from 'rxjs/operators';

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

  @Input()
  isEdit?: boolean;
  
  @Output()
  outputValue : any = new EventEmitter<string>();

  editView : boolean = false;

  queryNumber : any = 0;
  queryTitle: string = "";
  queryDescription : string = "";
  queryStatus ?: string | undefined | null = 'Created';
  queryType ?: string | undefined | null = '';

  constructor ( private api: ApiService ) {}

  ngOnInit() : void {
    console.log("Into the ngOnInit : ")
    if (this.isEdit === true) {
      if (this.inputValue) {
        console.log('Into the ngOnInit and into the if ');
        this.editView = true;
        this.queryNumber = this.inputValue.queryNumber;
        this.queryTitle = this.inputValue.queryTitle;
        this.queryDescription = this.inputValue.queryDescription;
        this.queryStatus = this.inputValue.queryStatus;
      }
    } else if (this.isEdit === false) {
      this.editView = false;
      this.queryNumber = '';
      // this.queryTitle = '';
      // this.queryDescription = '';
      this.queryTitleField.nativeElement.value = this.inputValue.queryTitle || '';
      this.queryDescriptionField.nativeElement.value = this.inputValue.queryDescription || '';
      this.queryStatus = "Unknown query raised";
  
  }
}

  ngOnChanges(changes: SimpleChanges): void {
    try {
      console.log("Intot he ngOnChanges : ")
      if (this.isEdit === true) {
        if (this.inputValue) {
          console.log("Into the ngOnChanges and into the if : ")
          this.editView = true;
          this.queryNumber = this.inputValue.queryNumber;
          this.queryTitle = this.inputValue.queryTitle;
          this.queryDescription = this.inputValue.queryDescription;
          this.queryStatus = this.inputValue.queryStatus;
          this.queryTitleField.nativeElement.value = this.inputValue.queryTitle || '';
          this.queryDescriptionField.nativeElement.value = this.inputValue.queryDescription || '';
        }
      } else if (this.isEdit === false) {
      this.queryTitleField.nativeElement.value = '';
      this.queryDescriptionField.nativeElement.value = '';
      this.editView = false;
      this.queryNumber = "";
      this.queryStatus = "Unknown query raised";

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

  async giveInputValue() : Promise<any> {
    console.log("Into the giveInputValue() : and the value of this.inputValue : ", this.inputValue)
    if (!this.inputValue?._id){
    let queryListApi = await this.api.queryCreateApi(
      {
        queryTitle: this.queryTitle,
        queryDescription: this.queryDescription,
        queryStatus: this.queryStatus,
        queryType: "testing",
        taskQueryRef: "65ed7966a9f7ed318eb7a244"
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
      // this.outputValue.emit({data:"response"});
    } else {
      let queryListApi = await this.api.queryUpdateApi(
        {
          id : this.inputValue._id,
          queryTitle: this.queryTitle,
          queryDescription: this.queryDescription,
          queryStatus: this.queryStatus,
          queryType: "testing",
          taskQueryRef: "65ed7966a9f7ed318eb7a244"
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
        // this.outputValue.emit({data:"response"});
    }

    // this.queryNumber = Math.floor(Math.random() * 9000) + 1000;
    // let queryListValues = JSON.parse(<any>localStorage.getItem('queryList'));
    // let loggedInUserData = JSON.parse(<any>localStorage.getItem('loggedInUser'))
    // let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    // console.log("The organisationTeamMapping is this : ", organisationTeamMapping.currentOrganisation, " and ",organisationTeamMapping.currentTeam)
    // if (organisationTeamMapping === null || organisationTeamMapping.currentTeam === undefined || organisationTeamMapping.currentOrganisation === undefined ) {
    //   alert("Kindly select organisation/account type and team.");
    //   return;
    // }
    
    // if (this.isEdit === true) {
    // if (this.inputValue) {
    //   this.editView = true;
    //   console.log("Into the if on giveInputValue and the this.queryTitle is this : ", this.queryTitle)
    //   let filteredData = queryListValues.forEach((data: any, index: number)=> {
    //     if (data.queryNumber === this.inputValue.queryNumber) {
    //       queryListValues[index] = {
    //         queryNumber : this.inputValue.queryNumber,
    //         queryTitle: this.queryTitle,
    //         queryDescription : this.queryDescription,
    //         queryStatus : this.inputValue.queryStatus == '' ? "Unknown query raised" : this.inputValue.queryStatus,
    //         queryType : this.inputValue.queryType == '' ? "Unknown query raised" : this.inputValue.queryType,
    //         queryCreatedBy : loggedInUserData.userName,
    //         organisationRef : organisationTeamMapping.currentOrganisation,
    //         currentTeamRef : organisationTeamMapping.currentTeam
    //       };
    //       localStorage.setItem('queryList',JSON.stringify(queryListValues));
    //       this.outputValue.emit({
    //         queryNumber : this.inputValue.queryNumber,
    //         queryTitle: this.queryTitle,
    //         queryDescription : this.inputValue.queryDescription,
    //         queryStatus : this.inputValue.queryStatus == '' ? "Unknown query raised" : this.inputValue.queryStatus,
    //         queryType : this.inputValue.queryType == '' ? "Unknown query raised" : this.inputValue.queryType,
    //         queryCreatedBy : loggedInUserData.userName,
    //         organisationRef : organisationTeamMapping.currentOrganisation,
    //         currentTeamRef : organisationTeamMapping.currentTeam
    //       });
    //     } 
    //   });
      this.inputValue = null;
      this.queryTitleField.nativeElement.value = '';
      this.queryDescriptionField.nativeElement.value = '';
      this.queryTitle = '';
      this.queryDescription = '';
      // this.myForm.resetForm();
  //     return;
  //   }
  // }
  //   console.log("After the if for editing")

  //   queryListValues.push({
  //     queryNumber : this.queryNumber,
  //     queryTitle: this.queryTitle,
  //     queryDescription : this.queryDescription,
  //     queryStatus : this.queryStatus == '' ? "Unknown query raised" : this.queryStatus,
  //     queryCreatedBy : loggedInUserData.userName,
  //     organisationRef : organisationTeamMapping.currentOrganisation,
  //     currentTeamRef : organisationTeamMapping.currentTeam
  //   });
  //   localStorage.setItem('queryList',JSON.stringify(queryListValues));
  //   this.outputValue.emit({
  //     queryNumber : this.queryNumber,
  //     queryTitle: this.queryTitle,
  //     queryDescription : this.queryDescription,
  //     queryStatus : this.queryStatus == '' ? "Unknown query raised" : this.queryStatus,
  //     organisationRef : organisationTeamMapping.currentOrganisation,
  //     currentTeamRef : organisationTeamMapping.currentTeam
  //   });
  //   this.queryDescription="";
  //   this.queryTitle="";
  //   this.queryNumber=0;
  //   this.queryTitleField.nativeElement.value = '';
  //   this.queryDescriptionField.nativeElement.value = '';
    // this.myForm.resetForm();
  }
  
  onSubmit() {
    this.queryTitleField.nativeElement.value = '';
    this.queryDescriptionField.nativeElement.value = '';
    // this.myForm.resetForm();
  }
  onModalClose() {
    // Handle the modal close event here
    console.log('Modal closed');
    // Add your logic here
    this.editView = false;
    if (this.isEdit === false) {
    this.queryDescription="";
    this.queryTitle="";
    this.queryNumber=0;
    this.queryTitleField.nativeElement.value = '';
    this.queryDescriptionField.nativeElement.value = '';
    }
  }
}
