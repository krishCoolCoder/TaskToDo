import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-view-team-model',
  templateUrl: './view-team-model.component.html',
  styleUrls: ['./view-team-model.component.css']
})
export class ViewTeamModelComponent implements OnInit, OnChanges{
  @Input()
  inputValue : any;
  
  ngOnInit() : any {
    console.log("The inputValue in the view model is this : ", this.inputValue)
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("The inputValue in the view model is this : ", this.inputValue)
  }
}
