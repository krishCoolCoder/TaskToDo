import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { catchError, map } from 'rxjs/operators';
import { FilterService } from '../service/filter.service';
import { ApiCall } from '../dependancy/apiService.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit ,OnChanges {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService ,
    private filter: FilterService,
    private testing: ApiCall) {
    }

  @Output()
  outputValue: any = new EventEmitter<string>();

    login : boolean = false;
    loggedInUserData : any = JSON.parse(<any>localStorage.getItem('loggedInUser'));
    organisationListData : any = JSON.parse(<any>localStorage.getItem('organisationList'));
    teamListData : any = JSON.parse(<any>localStorage.getItem('teamList'));
    projectListData : any ;
    accountType : any = "All organisation";
    team : any = "All tasks";
    project : any = "All Project"; // Display the project as My Project only when he has no task assinged from an organisations.
    test: boolean = false;

  changeTest():void {
    this.test = !this.test;
  }

    updateOriganisation(data : any) {
      console.log("The data.textContent is this : " ,data);
      this.filter.setOrganisationId(data?._id || "")
      console.log("The filter organisationid from DI is this : ",this.filter.getOrganisationId());
      this.accountType = data?.organisationName || "All organisation";
      this.team = "All tasks";
      this.project = "All project"
      this.outputValue.emit({
        organisation : "this.accountType",
      });
      console.log("The event is emitted : ", this.outputValue)
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
      this.outputValue.emit({
        currentOrganisation : data.textContent || "Personal account",
        currentTeam : organisationTeamMapping?.currentTeam || "My task"
      })
    }
    updateProject(data : any) {
      console.log("The data.textContent is this : " ,data);
      this.filter.setProjectId(data?._id || "")
      console.log("The filter organisationid from DI is this : ",this.filter.getProjectId());
      this.project = data?.projectName || "All project";
      this.outputValue.emit({
        project : this.project,
      });
      console.log("The event is emitted : ", this.outputValue)
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
      this.outputValue.emit({
        currentOrganisation : "Personal account",
        currentTeam : organisationTeamMapping?.currentTeam || "My task"
      })
    }
    async ngOnInit() {
      this.test = false;
      this.outputValue.emit("what");
      let userListApi = await this.api.organisationListApi().pipe(
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
        let teamListApi = await this.api.teamListApi("65edfc5757d78be6ce6be6b2").pipe(
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

      this.projectListData = await this.testing.projectListApi()
      console.log("this.projectListData is this : ", this.projectListData)
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
      // this.outputValue.emit({
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
