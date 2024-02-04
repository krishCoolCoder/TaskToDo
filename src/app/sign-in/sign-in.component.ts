import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router  ) {
    }
  emailId : string = "";
  password : string = "";
  emailInput(event: any) {
    this.emailId = event.target.value
  }

  passwordInput(event: any) {
    this.password = event.target.value
  }

  validate() {
    if ( (this.emailId == "saikrishnatechno@gmail.com" || this.emailId == "saikingstyle@gmail.com") && this.password == "admin") {
      localStorage.setItem('userList',"[]");
      localStorage.setItem('userTasks',"[]");
      localStorage.setItem('requestList',"[]");
      localStorage.setItem('queryList', "[]");
      localStorage.setItem('organisationList', "[]");
      localStorage.setItem('teamList', "[]");
      localStorage.setItem('loggedInUser', "null");
      localStorage.setItem('todoList', "[]");
      
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
        
        console.log("The result data is this : ",userData.filter((data: { userEmail: string; }) => data.userEmail == this.emailId));
        if (loggedInUseData.length === 0) {
          this.router.navigate(['/'], { relativeTo: this.route });
          alert("The user is not recognised");
        } else {
          localStorage.setItem('userList',JSON.stringify(userData))
          this.router.navigate(['/taskList'], { relativeTo: this.route });
        }
    }
  }

}
