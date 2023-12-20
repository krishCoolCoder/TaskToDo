import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-under-development',
  templateUrl: './under-development.component.html',
  styleUrls: ['./under-development.component.css']
})
export class UnderDevelopmentComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router  ) {
      setTimeout(()=>{
        console.log("Checking out the value of this.route : ", this.router.url)
        this.goToItems();
      }, 2000)
    }

  goToItems() {
    // Pass along the hero id if available
  // so that the HeroList component can select that item.
    this.router.navigate([''], { relativeTo: this.route });
  }

}
