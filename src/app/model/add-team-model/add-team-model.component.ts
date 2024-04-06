import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-add-team-model',
  templateUrl: './add-team-model.component.html',
  styleUrls: ['./add-team-model.component.css']
})
export class AddTeamModelComponent {
  @ViewChild('myForm')
  myForm!: NgForm;
  @ViewChild('teamNameField')
  teamNameField!: ElementRef;
  @ViewChild('teamDescriptionField')
  teamDescriptionField!: ElementRef;
  @Output()
  outputValue : any = new EventEmitter<string>();
  @Input()
  inputValue: any;
  @Input()
  isEdit?: boolean;

  teamId : any = 0;
  teamTitle: string = "";
  teamDescription : string = "";
  teamStatus ?: string | undefined | null = 'In-Active';
  organisationRef ?: string | null = null;

  constructor ( private api: ApiService ) {}

  formOrganisationName(event: any) : any {
    this.teamTitle = event?.target.value;
  }
  formDescription(event: any) : any {
    this.teamDescription = event?.target.value;
  }

  updateTeamStatus(value: any): any {
    console.log("The value is this : ", value.target  as HTMLParagraphElement);
    let data =  value.target  as HTMLParagraphElement;
    this.teamStatus = data.textContent;
    console.log("The vlue isss : ", this.teamStatus, " and the data is this : ", data)
  }

  async giveInputValue() : Promise<any> {
    if (!this.inputValue?._id){
      console.log("I am optimus prime")
      let organisationCreateApi = await this.api.teamCreateApi(
        {
          teamName: this.teamTitle,
          teamDescription: this.teamDescription,
          teamStatus: this.teamStatus,
          teamOrganisationRef: this.organisationRef
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
        let organisationListApi = await this.api.teamUpdateApi(
          {
            teamName: this.teamTitle,
            teamDescription: this.teamDescription,
            teamStatus: this.teamStatus,
            teamOrganisationRef: this.organisationRef
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
    // let teamList = JSON.parse(<any>localStorage.getItem('teamList'));
    // let loggedInUserData = JSON.parse(<any>localStorage.getItem('loggedInUser'));
    // let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    // console.log("The loggedInUerData is this : ", loggedInUserData)
    // console.log("The organizationList is this : ", teamList)
    // this.teamId = Math.floor(Math.random() * 9000) + 1000;
    // teamList.push(
    //   {
    //     teamId : this.teamId,
    //     teamTitle: this.teamTitle,
    //     teamDescription : this.teamDescription,
    //     teamStatus : this.teamStatus == '' ? "Private" : this.teamStatus,
    //     teamCreatedBy : loggedInUserData.userName,
    //     organisationRef : organisationTeamMapping.currentOrganisation
    //   }
    //   )
    //   localStorage.setItem('teamList',JSON.stringify(teamList));

    //   // let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    //   organisationTeamMapping = {
    //     currentOrganisation : organisationTeamMapping.currentOrganisation,
    //     currentTeam : this.teamTitle
    //   }
    //   localStorage.setItem('currentOrganisationTeamRef', JSON.stringify(organisationTeamMapping));


    //   this.inputValue.emit({
    //     teamId : this.teamId,
    //     teamTitle: this.teamTitle,
    //     teamDescription : this.teamDescription,
    //     teamStatus : this.teamStatus == '' ? "Private" : this.teamStatus ,
    //     teamCreatedBy : loggedInUserData.userName,
    //     organisationRef : organisationTeamMapping.currentOrganisation
    // });
    // this.teamDescription="";
    // this.teamTitle="";
    // this.teamId=0;
    // this.teamNameField.nativeElement.value = "";
    // this.teamDescriptionField.nativeElement.value = "";
    // this.myForm.resetForm();
  }

  onSubmit() {
    this.teamNameField.nativeElement.value = "";
    this.teamDescriptionField.nativeElement.value = "";
    this.myForm.resetForm();
  }
}
