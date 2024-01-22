import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm , FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-add-user-model',
  templateUrl: './add-user-model.component.html',
  styleUrls: ['./add-user-model.component.css']
})
export class AddUserModelComponent {
  @ViewChild('myForm')
  myForm!: NgForm;
  @ViewChild('userNameInput')
  userNameInput!: ElementRef;
  @ViewChild('userEmailInput')
  userEmailInput!: ElementRef;

  @Output()
  inputValue : any = new EventEmitter<string>();

  // task : any = {
  //   taskNo : 0,
  //   title : "",
  //   description : ""
  // }

  requestNumber : any = 0;
  requestTitle: string = "";
  requestDescription : string = "";
  userRole ?: string | undefined | null = '';

  userData : any = {
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

  // ngOnInit() : void {
  //   this.task = {
  //     taskNo: 0,
  //     title: "",
  //     description: ""
  //   }
  // }

  formUserName(event: any) : any {
    this.userData.userName = event?.target.value;
  }
  formUserEmail(event: any) : any {
    this.userData.userEmail = event?.target.value;
  }

  updateStatus(value: any): any {
    console.log("The value is this : ", value.target  as HTMLParagraphElement);
    let data =  value.target  as HTMLParagraphElement;
    this.userData.userRole = data.textContent;
    console.log("The vlue isss : ", this.userRole, " and the data is this : ", data)
  }

  giveInputValue() : any {
    let userListValue = JSON.parse(<any>localStorage.getItem('userList'));
    userListValue.push(this.userData);
    console.log("The value of the userListValue is this : ", userListValue)
    console.log("The step two is this : ", userListValue, " and the userData is this : ", this.userData)
    localStorage.setItem('userList',JSON.stringify(userListValue));
    this.inputValue.emit(this.userData);
    this.myForm.reset();
    this.userNameInput.nativeElement.value = '';
    this.userEmailInput.nativeElement.value = '';
  }

  onSubmit() {
    // Handle form submission logic here

    // Clear form fields
    this.userNameInput.nativeElement.value = '';
    this.userEmailInput.nativeElement.value = '';
    // this.requestStatus = '';
    // We need to update these value manualy though

    // Reset the form
    this.myForm.resetForm();
  }

}
