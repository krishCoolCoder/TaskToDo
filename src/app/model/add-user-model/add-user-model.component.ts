import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm , FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-add-user-model',
  templateUrl: './add-user-model.component.html',
  styleUrls: ['./add-user-model.component.css']
})
export class AddUserModelComponent implements OnInit, OnChanges {
  @ViewChild('myForm')
  myForm!: NgForm;
  @ViewChild('userNameInput')
  userNameInput!: ElementRef;
  @ViewChild('userEmailInput')
  userEmailInput!: ElementRef;

  @Output()
  outputValue : any = new EventEmitter<string>();
  
  @Input()
  inputValue : any;

  @Input()
  isEdit?: boolean;

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

  ngOnInit(): void {
    console.log("The value of inputValue in ngOnInit child component is this : ",this.inputValue)
    if (this.isEdit === true) {
    if (this.inputValue) {
      this.userData.userName = this.inputValue.userName;
      this.userData.userEmail = this.inputValue.userEmail;
      this.userData.userRole = this.inputValue.userRole;
      this.userNameInput.nativeElement.value = this.inputValue.userName || "";
      this.userEmailInput.nativeElement.value = this.inputValue.userEmail || "";
    }
  } else if (this.isEdit === false) {
    this.userData.userName = '';
    this.userData.userEmail = '';
    this.userData.userRole = '';
    this.userNameInput.nativeElement.value = "";
    this.userEmailInput.nativeElement.value = "";
  }
  }

  ngOnChanges(changes: SimpleChanges): void {
    try {

      console.log("The value of inputValue in ngOnChanges child component is this : ",this.inputValue);
      // this.taskTitle = this.inputValue.title;
      // this.taskDescription = this.inputValue.description;
      if (this.isEdit === true) {
      this.userNameInput.nativeElement.value = this.inputValue.userName || "";
      this.userEmailInput.nativeElement.value = this.inputValue.userEmail || "";
      if (this.inputValue) {
        this.userData.userName = this.inputValue.userName;
        this.userData.userEmail = this.inputValue.userEmail;
        this.userData.userRole = this.inputValue.userRole;
      }
    } else if (this.isEdit === false) { 
      this.userData.userName = '';
      this.userData.userEmail = '';
      this.userData.userRole = '';
      this.userNameInput.nativeElement.value = "";
      this.userEmailInput.nativeElement.value = "";

    }

    } catch ( error : any) {
      console.log("The error is this : ", error.name)
    }
  }

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
    let loggedInUserData = JSON.parse(<any>localStorage.getItem('loggedInUser'));
    if (this.isEdit === true) {
      if (this.inputValue) {
        let filteredData = userListValue.forEach((data: any, index: number) => {
          if (data.userEmail === this.inputValue.userEmail) {
            userListValue[index].userEmail = this.userData.userEmail;
            userListValue[index].userName = this.userData.userName;
            userListValue[index].userRole = this.userData.userRole;
            localStorage.setItem('userList', JSON.stringify(userListValue));
            this.outputValue.emit({
              userEmail: this.userData.userEmail,
              userName: this.userData.userName,
              description: this.userData.userRole,
            });
          }
        });
        this.inputValue = null;
        this.userData.userEmail = '';
        this.userData.userName = '';
        this.userData.userRole = '';
        this.userNameInput.nativeElement.value = '';
        this.userEmailInput.nativeElement.value = '';
        this.myForm.resetForm();
        return;
      }
    }
    userListValue.push(this.userData);
    localStorage.setItem('userList',JSON.stringify(userListValue));
    this.outputValue.emit(this.userData);
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
  
  onModelClose() {
    if (this.isEdit === false) {
      this.inputValue = null;
      this.userData.userEmail = '';
      this.userData.userName = '';
      this.userData.userRole = '';
      this.userNameInput.nativeElement.value = '';
      this.userEmailInput.nativeElement.value = '';
    }
  }

}
