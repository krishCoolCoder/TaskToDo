import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router  ) {
    }

  goToSignIn() {
    // Pass along the hero id if available
  // so that the HeroList component can select that item.
    this.router.navigate(['/signIn'], { relativeTo: this.route });
  }
  goToTask() {
    // Pass along the hero id if available
  // so that the HeroList component can select that item.
    this.router.navigate(['/taskList'], { relativeTo: this.route });
  }
  
}
