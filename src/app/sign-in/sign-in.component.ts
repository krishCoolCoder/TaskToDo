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
      this.router.navigate(['/tasks'], { relativeTo: this.route });
    }
  }

}
