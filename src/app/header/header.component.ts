import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit ,OnChanges {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService ) {
    }

  @Output()
  outputData : any = new EventEmitter<string>();

  // @Output()
  // outputValue: any = new EventEmitter<string>();


    login : boolean = false;
    loggedInUserData : any = JSON.parse(<any>localStorage.getItem('loggedInUser'));
    organisationListData : any = JSON.parse(<any>localStorage.getItem('organisationList'));
    teamListData : any = JSON.parse(<any>localStorage.getItem('teamList'));
    accountType : any = "Personal account";
    team : any = "My tasks";
    project : any = "My Project"; // Display the project as My Project only when he has no task assinged from an organisations.
    // isPersonalAccount : boolean = true;

    test: boolean = false;
  changeTest():void {
    this.test = !this.test;
  }

    updateOriganisation(event : any) {
      console.log('The value is this : ', event.target as HTMLParagraphElement);
    let data = event.target as HTMLParagraphElement;
      console.log("The data.textContent is this : " ,data.textContent);
      this.accountType = data.textContent;
      this.team = "My tasks";
      let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
      organisationTeamMapping = {
        currentOrganisation : data.textContent,
        currentTeam : "My tasks"
      }
      organisationTeamMapping["currentTeam"] = this.team;
      localStorage.setItem('currentOrganisationTeamRef', JSON.stringify(organisationTeamMapping));
      this.teamListData = JSON.parse(<any>localStorage.getItem('teamList'));
      console.log("The teamlist before filter is this : ", this.teamListData)
      this.teamListData = this.teamListData.filter((data : any)=> {
        return data.organisationRef == organisationTeamMapping.currentOrganisation
      })
      console.log("The teamlist after filter is this : ", this.teamListData)
      if (this.accountType !== "Personal account"){
        // this.isPersonalAccount = false;
      }
      this.outputData.emit({
        currentOrganisation : data.textContent || "Personal account",
        currentTeam : organisationTeamMapping?.currentTeam || "My task"
      })
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
        return data.organisationRef == organisationTeamMapping.currentOrganisation
      })
      // console.log('The team data is this : ', organisationTeamMapping)
      organisationTeamMapping["currentTeam"] = this.team;
      localStorage.setItem('currentOrganisationTeamRef', JSON.stringify(organisationTeamMapping));
      this.outputData.emit({
        currentOrganisation : data.textContent || "Personal account",
        currentTeam : organisationTeamMapping?.currentTeam || "My task"
      })
    }

    ngOnChanges(changes: SimpleChanges): void {
      console.log("The changes has been made in header.")
      console.log("login data in ngOnChanges : ", this.login)
      this.organisationListData = JSON.parse(<any>localStorage.getItem('organisationList'));
      this.team = this.organisationListData.currentTeam || "My tasks";
      this.teamListData = JSON.parse(<any>localStorage.getItem('teamList'));
      let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
      this.teamListData = this.teamListData.filter((data : any)=> {
        return data.organisationRef == organisationTeamMapping.currentOrganisation
      })
      this.outputData.emit({
        currentOrganisation : "Personal account",
        currentTeam : organisationTeamMapping?.currentTeam || "My task"
      })
    }
    ngOnInit() {
      this.test = false;
      let userListApi = this.api.organisationListApi().pipe(
        map((response: any) => {
          console.log("queries.component.ts says that response is this : ", response);
          this.organisationListData = response?.data;
          return response; // Forward the response to the next operator
        }),
        catchError((error) => {
          // Handle error response here
          console.error('API Error:', error);
          // this.noData = this.response?.data.length === 0 ? true : false; 
          alert(error.error.message || error.statusText)
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
        let teamListApi = this.api.teamListApi("65edfc5757d78be6ce6be6b2").pipe(
          map((response: any) => {
            this.teamListData = response?.data;
            return response; // Forward the response to the next operator
          }),
          catchError((error) => {
            // Handle error response here
            console.error('API Error:', error);
            alert(error.error.message || error.statusText)
            throw error; // Re-throw the error to propagate it
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
      // this.loggedInUserData = JSON.parse(<any>localStorage.getItem('loggedInUser'));
      // this.organisationListData = JSON.parse(<any>localStorage.getItem('organisationList'));
      // let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
      // // console.log("The orgnanisation data in ngOnInit is this : ", organisationTeamMapping)
      // this.team = organisationTeamMapping?.currentTeam || "My tasks";
      // this.accountType = organisationTeamMapping?.currentOrganisation || "Personal account";
      // this.teamListData = JSON.parse(<any>localStorage.getItem('teamList'));
      // console.log("The teamlist before filter is this : ", this.teamListData)
      // this.teamListData = this.teamListData.filter((data : any)=> {
      //   return data.organisationRef == organisationTeamMapping.currentOrganisation
      // })
      // // console.log("The team list is this : ", this.teamListData)
      // // console.log("the value of this.loggedInUserData is this : ", this.loggedInUserData);
      // // console.log("The team is this : ", this.team)
      let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
      console.log("The currentUser is this : ", currentUser)
      if (currentUser.data[0]?._id) {
        console.log("Into the if : ")
        this.login = true;
      }
      //   console.log("Into the if : ")
      // } else {
      //   this.login = false;
      //   console.log("Into the else : ")
      // }
      // console.log("login data in ngOnInit : ", this.login)
      // this.outputData.emit({
      //   currentOrganisation : "Personal account",
      //   currentTeam : organisationTeamMapping?.currentTeam || "My task"
      // })
    }
    onClick(){
      this.router.navigate(['/'], { relativeTo: this.route });
    }
    getInputValue ($event: any) {
      let organisatonListApi = this.api.organisationListApi().pipe(
        map((response: any) => {
          console.log("queries.component.ts says that response is this : ", response);
          this.organisationListData = response?.data;
          return response; // Forward the response to the next operator
        }),
        catchError((error) => {
          // Handle error response here
          console.error('API Error:', error);
          // this.noData = this.response?.data.length === 0 ? true : false; 
          alert(error.error.message || error.statusText)
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
      let teamListApi = this.api.teamListApi("65edfc5757d78be6ce6be6b2").pipe(
        map((response: any) => {
          this.teamListData = response?.data;
          return response; // Forward the response to the next operator
        }),
        catchError((error) => {
          // Handle error response here
          console.error('API Error:', error);
          alert(error.error.message || error.statusText)
          throw error; // Re-throw the error to propagate it
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

      // console.log("The event value is this : ", $event);
      // console.log("login data in getInputValue : ",this.login)
      // this.organisationListData = JSON.parse(<any>localStorage.getItem('organisationList'));
      // this.team = this.organisationListData.currentTeam || "My tasks";
      // this.teamListData = JSON.parse(<any>localStorage.getItem('teamList'));
      // console.log("The teamlist before filter is this : ", this.teamListData)
      // let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
      // this.teamListData = this.teamListData.filter((data : any)=> {
      //   console.log("The data.organisationRef is this : ",data.organisationRef, " and the organsiationTeamMapping.currentOrganisation : ", organisationTeamMapping.currentOrganisation)
      //   return data.organisationRef == organisationTeamMapping.currentOrganisation
      // })
      // console.log("The team list is this : ", this.teamListData)
    } 
}
