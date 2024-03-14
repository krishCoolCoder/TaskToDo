import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-add-organisation-model',
  templateUrl: './add-organisation-model.component.html',
  styleUrls: ['./add-organisation-model.component.css']
})
export class AddOrganisationModelComponent {
  @ViewChild('myForm')
  myForm!: NgForm;
  @ViewChild('organisationNameField')
  organisationNameField!: ElementRef;
  @ViewChild('organisationDescriptionField')
  organisationDescriptionField!: ElementRef;
  
  @Output()
  inputValue : any = new EventEmitter<string>();

  organisationId : any = 0;
  organisationTitle: string = "";
  organisationDescription : string = "";
  organisationAccessControl ?: string | undefined | null = '';

  constructor ( private api: ApiService ) {}

  formOrganisationName(event: any) : any {
    this.organisationTitle = event?.target.value;
  }
  formDescription(event: any) : any {
    this.organisationDescription = event?.target.value;
  }

  updateAccessControl(value: any): any {
    console.log("The value is this : ", value.target  as HTMLParagraphElement);
    let data =  value.target  as HTMLParagraphElement;
    this.organisationAccessControl = data.textContent;
    console.log("The vlue isss : ", this.organisationAccessControl, " and the data is this : ", data)
  }

  async giveInputValue() : Promise<any> {
    if (!this.inputValue?._id){
      console.log("I am optimus prime")
      let organisationCreateApi = await this.api.organisationCreateApi(
        {
          organisationName: this.organisationTitle,
          organisationDescription: this.organisationDescription,
          organisationType: this.organisationAccessControl || "Private"
      }
      ).pipe(
        map((response: any) => {
          console.log("add-todo-model.component.ts says that response after create is this : ", response);
          // this.noData = response.data.length === 0 ? true : false;
          // this.taskList = response?.data
          this.inputValue.emit({data:"response"});
          return response; // Forward the response to the next operator
        }),
        catchError((error) => {
          // Handle error response here
          console.error('API Error:', error);
          alert(error.error.message || error.statusText)
          this.inputValue.emit({data:"response"});
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
        console.log("I am megatron.")
        let organisationListApi = await this.api.organisationUpdateApi(
          {
            id : this.inputValue._id,
            organisationName: this.organisationTitle,
            organisationDescription: this.organisationDescription,
            organisationType: this.organisationAccessControl || "Private"
        }
        ).pipe(
          map((response: any) => {
            console.log("add-query-model.component.ts says that response is this : ", response);
            // this.noData = response.data.length === 0 ? true : false;
            // this.taskList = response?.data
            this.inputValue.emit({data:"response"});
            return response; // Forward the response to the next operator
          }),
          catchError((error) => {
            // Handle error response here
            console.error('API Error:', error);
            alert(error.error.message || error.statusText)
            this.inputValue.emit({data:"response"});
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

    // let organisationList = JSON.parse(<any>localStorage.getItem('organisationList'));
    // let loggedInUserData = JSON.parse(<any>localStorage.getItem('loggedInUser'));
    // console.log("The loggedInUerData is this : ", loggedInUserData)
    // console.log("The organizationList is this : ", organisationList)
    // this.organisationId = Math.floor(Math.random() * 9000) + 1000;
    // organisationList.push(
    //   {
    //     organisationId : this.organisationId,
    //     organisationTitle: this.organisationTitle,
    //     organisationDescription : this.organisationDescription,
    //     organisationAccessControl : this.organisationAccessControl == '' ? "Private" : this.organisationAccessControl,
    //     organisationCreatedBy : loggedInUserData.userName
    //   }
    //   )
    //   localStorage.setItem('organisationList',JSON.stringify(organisationList));

    //   let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    //   organisationTeamMapping = {
    //     currentOrganisation : this.organisationTitle,
    //     currentTeam : "My tasks"
    //   }
    //   localStorage.setItem('currentOrganisationTeamRef', JSON.stringify(organisationTeamMapping));

    //   this.inputValue.emit({
    //     organisationId : this.organisationId,
    //     organisationTitle: this.organisationTitle,
    //     organisationDescription : this.organisationDescription,
    //     organisationAccessControl : this.organisationAccessControl == '' ? "Private" : this.organisationAccessControl ,
    //     organisationCreatedBy : loggedInUserData.userName
    // });
    // this.organisationDescription="";
    // this.organisationTitle="";
    // this.organisationId=0;
    // this.organisationNameField.nativeElement.value = "";
    // this.organisationDescriptionField.nativeElement.value = "";
    // this.myForm.resetForm();
  }
  
  onSubmit() {
    this.organisationNameField.nativeElement.value = "";
    this.organisationDescriptionField.nativeElement.value = "";
    this.myForm.resetForm();
  }
}
