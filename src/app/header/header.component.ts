import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit ,OnChanges {
  constructor(
    private route: ActivatedRoute,
    private router: Router  ) {
    }
    login : boolean = true;
    loggedInUserData : any = JSON.parse(<any>localStorage.getItem('loggedInUser'));
    organisationListData : any = JSON.parse(<any>localStorage.getItem('organisationList'));
    teamListData : any = JSON.parse(<any>localStorage.getItem('teamList'));
    accountType : any = "Personal account";
    team : any = "My tasks";
    // isPersonalAccount : boolean = true;

    updateOriganisation(event : any) {
      console.log('The value is this : ', event.target as HTMLParagraphElement);
    let data = event.target as HTMLParagraphElement;
      console.log("The data.textContent is this : " ,data.textContent);
      this.accountType = data.textContent;
      let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
      organisationTeamMapping = {
        currentOrganisation : data.textContent
      }
      localStorage.setItem('currentOrganisationTeamRef', JSON.stringify(organisationTeamMapping));
      this.teamListData = JSON.parse(<any>localStorage.getItem('teamList'));
      console.log("The teamlist before filter is this : ", this.teamListData)
      this.teamListData = this.teamListData.filter((data : any)=> {
        console.log("The data.organisationRef is this : ",data.organisationRef, " and the organsiationTeamMapping.currentOrganisation : ", organisationTeamMapping.currentOrganisation)
        return data.organisationRef == organisationTeamMapping.currentOrganisation
      })
      console.log("The teamlist after filter is this : ", this.teamListData)
      if (this.accountType !== "Personal account"){
        // this.isPersonalAccount = false;
      }
    }
    updateTeam(event : any) {
      console.log('The value is this : ', event.target as HTMLParagraphElement);
    let data = event.target as HTMLParagraphElement;
      console.log("The data.textContent is this : " ,data.textContent);
      this.team = data.textContent;
      let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
      this.teamListData = JSON.parse(<any>localStorage.getItem('teamList'));
      console.log("The teamlist before filter is this : ", this.teamListData)
      this.teamListData = this.teamListData.filter((data : any)=> {
        console.log("Into the updateTeam the data.organisationRef is this : ",data.organisationRef, " and the organsiationTeamMapping.currentOrganisation : ", organisationTeamMapping.currentOrganisation)
        return data.organisationRef == organisationTeamMapping.currentOrganisation
      })
      // console.log('The team data is this : ', organisationTeamMapping)
      organisationTeamMapping["currentTeam"] = this.team;
      localStorage.setItem('currentOrganisationTeamRef', JSON.stringify(organisationTeamMapping));
      if (this.accountType !== "Personal account"){
        // this.isPersonalAccount = false;
      }
    }

    ngOnChanges(changes: SimpleChanges): void {
      console.log("The changes has been made in header.")
      console.log("login data in ngOnChanges : ", this.login)
      this.organisationListData = JSON.parse(<any>localStorage.getItem('organisationList'));
      this.team = this.organisationListData.currentTeam || "My tasks";
      this.teamListData = JSON.parse(<any>localStorage.getItem('teamList'));
      let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
      this.teamListData = this.teamListData.filter((data : any)=> {
        console.log("The data.organisationRef is this : ",data.organisationRef, " and the organsiationTeamMapping.currentOrganisation : ", organisationTeamMapping.currentOrganisation)
        return data.organisationRef == organisationTeamMapping.currentOrganisation
      })
    }
    ngOnInit() {
      this.loggedInUserData = JSON.parse(<any>localStorage.getItem('loggedInUser'));
      this.organisationListData = JSON.parse(<any>localStorage.getItem('organisationList'));
      let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
      console.log("The orgnanisation data in ngOnInit is this : ", organisationTeamMapping)
      this.team = organisationTeamMapping?.currentTeam || "My tasks";
      this.accountType = organisationTeamMapping?.currentOrganisation || "Personal account";
      this.teamListData = JSON.parse(<any>localStorage.getItem('teamList'));
      console.log("The teamlist before filter is this : ", this.teamListData)
      this.teamListData = this.teamListData.filter((data : any)=> {
        console.log("The data.organisationRef is this : ",data.organisationRef, " and the organsiationTeamMapping.currentOrganisation : ", organisationTeamMapping.currentOrganisation)
        return data.organisationRef == organisationTeamMapping.currentOrganisation
      })
      console.log("The team list is this : ", this.teamListData)
      console.log("the value of this.loggedInUserData is this : ", this.loggedInUserData);
      console.log("The team is this : ", this.team)
      if (this.loggedInUserData !== undefined && this.loggedInUserData !== null) {
        this.login = true;
        console.log("Into the if : ")
      } else {
        this.login = false;
        console.log("Into the else : ")
      }
      console.log("login data in ngOnInit : ", this.login)
    }
    onClick(){
      this.router.navigate(['/'], { relativeTo: this.route });
    }
    getInputValue ($event: any) {
      console.log("The event value is this : ", $event);
      console.log("login data in getInputValue : ",this.login)
      this.organisationListData = JSON.parse(<any>localStorage.getItem('organisationList'));
      this.team = this.organisationListData.currentTeam || "My tasks";
      this.teamListData = JSON.parse(<any>localStorage.getItem('teamList'));
      console.log("The teamlist before filter is this : ", this.teamListData)
      let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
      this.teamListData = this.teamListData.filter((data : any)=> {
        console.log("The data.organisationRef is this : ",data.organisationRef, " and the organsiationTeamMapping.currentOrganisation : ", organisationTeamMapping.currentOrganisation)
        return data.organisationRef == organisationTeamMapping.currentOrganisation
      })
      console.log("The team list is this : ", this.teamListData)
    } 
}
