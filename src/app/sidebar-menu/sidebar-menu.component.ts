import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarMenuComponent {
  sideBarData : String[] = ["Dashboard","Tasks","Request","Queries","Performance"];

  logout() : any {
    localStorage.clear() // Use this method to remove all the data from the local storage.
  }
}
