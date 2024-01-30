import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-team-model',
  templateUrl: './add-team-model.component.html',
  styleUrls: ['./add-team-model.component.css']
})
export class AddTeamModelComponent {
  @Output()
  inputValue : any = new EventEmitter<string>();

  teamId : any = 0;
  teamTitle: string = "";
  teamDescription : string = "";
  teamStatus ?: string | undefined | null = '';

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

  giveInputValue() : any {
    let teamList = JSON.parse(<any>localStorage.getItem('teamList'));
    let loggedInUserData = JSON.parse(<any>localStorage.getItem('loggedInUser'));
    console.log("The loggedInUerData is this : ", loggedInUserData)
    console.log("The organizationList is this : ", teamList)
    this.teamId = Math.floor(Math.random() * 9000) + 1000;
    teamList.push(
      {
        teamId : this.teamId,
        teamTitle: this.teamTitle,
        teamDescription : this.teamDescription,
        teamStatus : this.teamStatus == '' ? "Private" : this.teamStatus,
        teamCreatedBy : loggedInUserData.userName
      }
      )
      localStorage.setItem('teamList',JSON.stringify(teamList));
      this.inputValue.emit({
        teamId : this.teamId,
        teamTitle: this.teamTitle,
        teamDescription : this.teamDescription,
        teamStatus : this.teamStatus == '' ? "Private" : this.teamStatus ,
        teamCreatedBy : loggedInUserData.userName
    });
    this.teamDescription="";
    this.teamTitle="";
    this.teamId=0;
  }
}
