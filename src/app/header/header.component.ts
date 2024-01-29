import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router  ) {
    }
    login : boolean = false;
    loggedInUserData : any = JSON.parse(<any>localStorage.getItem('loggedInUser'));
    ngOnInit() {
      this.loggedInUserData = JSON.parse(<any>localStorage.getItem('loggedInUser'));
      if (this.loggedInUserData !== undefined || this.loggedInUserData !== null) {
        this.login = true;
      }
    }
    onClick(){
      this.router.navigate(['/'], { relativeTo: this.route });
    }
}
