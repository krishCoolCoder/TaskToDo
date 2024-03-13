import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { firstValueFrom } from 'rxjs';
// import { catchError } from 'rxjs/operators';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router  ,
    private api: ApiService
    ) {
    }
  emailId : string = "";
  password : string = "";
  loader: boolean = false;
  emailInput(event: any) {
    this.emailId = event.target.value
  }

  passwordInput(event: any) {
    this.password = event.target.value
  }

  async validate() {
    this.loader = true;
    let loginApiRes = this.api.loginApi({ userMail: this.emailId, userPassword: this.password }).pipe(
      map((response) => {
        // Handle success response here
        console.log('API Response:', response);
        localStorage.setItem('userList',"[]");
      localStorage.setItem('userTasks',"[]");
      localStorage.setItem('requestList',"[]");
      localStorage.setItem('queryList', "[]");
      localStorage.setItem('organisationList', "[]");
      localStorage.setItem('teamList', "[]");
      localStorage.setItem('loggedInUser', "null");
      localStorage.setItem('currentUser', "null");
      localStorage.setItem('todoList', "[]");
      localStorage.setItem('currentOrganisationTeamRef', "null");
      
      let userData = JSON.parse(<any>localStorage.getItem('userList'));
      userData.push(
        {
          userName : "Saikrishna P",
          userEmail : "saikrishnatechno@gmail.com",
          userRole : "Admin",
          totalTaskCount : 0,
          completedTaskCount : 0,
          pendingTaskCount : 0,
          taskToDoCount : 0,
          performance : 50,
          review : "Lets see"
        }
        )
        let loggedInUseData = userData.filter((data: { userEmail: string; }) => data.userEmail == this.emailId);
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUseData[0]));
        localStorage.setItem('currentUser', JSON.stringify(response));
        let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
      organisationTeamMapping = {
        currentOrganisation : "Personal account",
        currentTeam : "My task"
      }
      localStorage.setItem('currentOrganisationTeamRef', JSON.stringify(organisationTeamMapping));
        
        console.log("The result data is this : ",userData.filter((data: { userEmail: string; }) => data.userEmail == this.emailId));

        if (loggedInUseData.length === 0) {
          this.router.navigate(['/'], { relativeTo: this.route });
          alert("The user is not recognised");
        } else {
          localStorage.setItem('userList',JSON.stringify(userData))
          this.router.navigate(['/taskList'], { relativeTo: this.route });
        }
        return response; // Forward the response to the next operator
      }),
      catchError((error) => {
        // Handle error response here
        console.error('API Error:', error);
        alert(error.error.message || error.statusText)
        throw error; // Re-throw the error to propagate it
        // Alternatively, you can return a default value or another Observable here
        // return of(defaultValue); // Return a default value
        // return throwError('Error occurred'); // Return another Observable
      })
    ).subscribe({
        next: (data) => {
          console.log('API Response:', data);
          this.loader = false;
          // Handle the response data here
        },
        error: (error) => {
          console.error('API Error:', error);
          this.loader = false;
          // Handle any errors here
        }
      });
  }

}
