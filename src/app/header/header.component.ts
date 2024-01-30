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
    login : boolean = false;
    loggedInUserData : any = JSON.parse(<any>localStorage.getItem('loggedInUser'));
    organisationListData : any = JSON.parse(<any>localStorage.getItem('organisationList'));
    teamListData : any = JSON.parse(<any>localStorage.getItem('teamList'));
    ngOnChanges(changes: SimpleChanges): void {
      console.log("The changes has been made in header.")
      this.organisationListData = JSON.parse(<any>localStorage.getItem('organisationList'));
      this.teamListData = JSON.parse(<any>localStorage.getItem('teamList'));
    }
    ngOnInit() {
      this.loggedInUserData = JSON.parse(<any>localStorage.getItem('loggedInUser'));
      this.organisationListData = JSON.parse(<any>localStorage.getItem('organisationList'));
      this.teamListData = JSON.parse(<any>localStorage.getItem('teamList'));
      if (this.loggedInUserData !== undefined || this.loggedInUserData !== null) {
        this.login = true;
      }
    }
    onClick(){
      this.router.navigate(['/'], { relativeTo: this.route });
    }
    getInputValue ($event: any) {
      console.log("The event value is this : ", $event);
      this.organisationListData = JSON.parse(<any>localStorage.getItem('organisationList'));
      this.teamListData = JSON.parse(<any>localStorage.getItem('teamList'));
    } 
}
