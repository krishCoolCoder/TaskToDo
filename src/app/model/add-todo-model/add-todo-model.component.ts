import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-todo-model',
  templateUrl: './add-todo-model.component.html',
  styleUrls: ['./add-todo-model.component.css']
})
export class AddTodoModelComponent implements OnInit, OnChanges{
  @ViewChild('myForm')
  myForm!: NgForm;
  @ViewChild('todoTitle')
  todoTitle!: ElementRef;
  
  @Output()
  outputValue : any = new EventEmitter<string>();
  
  @Input()
  inputValue: any;
  @Input()
  isEdit: any;

  todoData: any;

  ngOnInit(): void {
    try {
      if (this.isEdit === true) {
      if(this.inputValue) {
        this.todoData = this.inputValue;
        this.todoTitle.nativeElement.value = this.todoData;
      }
    } else if (this.isEdit === false) {
      this.todoData = "";
      this.todoTitle.nativeElement.value = "";
    }
    } catch ( error ) {
      console.log("The error in ngOnInit is this : ", error)
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    try {
      if (this.isEdit === true) {
        if(this.inputValue) {
        this.todoTitle.nativeElement.value = this.inputValue || "";
        this.todoData = this.inputValue;
      }
    } else if (this.isEdit === false) {
      this.todoTitle.nativeElement.value = "";
      this.todoData = "";
    }
    } catch (error) {
      console.log("The error in ngOnChanges is this : ", error)
    }
  }
  formTodoData(event: any) {
    this.todoData = event?.target.value;
  }
  giveInputValue() {
    let todoList = JSON.parse(<any>localStorage.getItem('todoList'));
    let loggedInUserData = JSON.parse(<any>localStorage.getItem('loggedInUser'));
    let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    console.log("The organisationTeamMapping is this : ", organisationTeamMapping.currentOrganisation, " and ",organisationTeamMapping.currentTeam)
    if (organisationTeamMapping === null || organisationTeamMapping.currentTeam === undefined || organisationTeamMapping.currentOrganisation === undefined ) {
      alert("Kindly select organisation/account type and team.");
      return;
    }
    if (this.isEdit === true) {
    if (this.inputValue) {
      let filteredData = todoList.forEach((data: any, index: number)=>{
        if (data.todoData == this.inputValue) {
          todoList[index] = {
            todoData : this.todoData,
            organisationRef : organisationTeamMapping.currentOrganisation,
            currentTeamRef : organisationTeamMapping.currentTeam
          }
          localStorage.setItem('todoList',JSON.stringify(todoList));
        }
      });
      this.outputValue.emit(
        {
          todoData : this.todoData,
          organisationRef : organisationTeamMapping.currentOrganisation,
          currentTeamRef : organisationTeamMapping.currentTeam
        }
      )
      this.todoData = "";
      this.todoTitle.nativeElement.value = "";
      this.inputValue = null;
      return;
    }
  }
    todoList.push(
      {
        todoData : this.todoData,
        organisationRef : organisationTeamMapping.currentOrganisation,
        currentTeamRef : organisationTeamMapping.currentTeam
      }
    )
    localStorage.setItem('todoList',JSON.stringify(todoList));
    this.outputValue.emit(
      {
        todoData : this.todoData,
        organisationRef : organisationTeamMapping.currentOrganisation,
        currentTeamRef : organisationTeamMapping.currentTeam
      }
      )
      this.todoData = "";
      this.todoTitle.nativeElement.value = '';
      this.myForm.resetForm();
      
      // todoList = JSON.parse(<any>localStorage.getItem('todoList'));
      // let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
      // todoList = todoList.filter((data:any)=>{
      //   return ((data.organisationRef == organisationTeamMapping.currentOrganisation) && (data.currentTeamRef == organisationTeamMapping.currentTeam))
      // })
      // localStorage.setItem('todoList',JSON.stringify(todoList));
  }
  onSubmit() {
    this.todoData = "";
    this.todoTitle.nativeElement.value = "";
    this.myForm.resetForm();
  }
  onModelClose() {
    if (this.isEdit === false) {
      this.todoTitle.nativeElement.value = "";
      this.todoData = "";
    }
  }
}
