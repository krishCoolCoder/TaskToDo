import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm , FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { catchError, map } from 'rxjs/operators';


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

  constructor ( private api: ApiService ) {}

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
      this.userEmailInput.nativeElement.value = this.inputValue.email || "";
      if (this.inputValue) {
        this.userData.userName = this.inputValue.userName;
        this.userData.userEmail = this.inputValue.email;
        this.userData.userRole = this.inputValue.userRoles[0].roleName;
        this.userRole = this.inputValue.userRoles[0].roleName;
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
    console.log("The userEmail is this : ", this.userData.userEmail)
  }

  updateStatus(value: any): any {
    console.log("The value is this : ", value.target  as HTMLParagraphElement);
    let data =  value.target  as HTMLParagraphElement;
    this.userData.userRole = data.textContent;
    console.log("The vlue isss : ", this.userRole, " and the data is this : ", data)
  }

  async giveInputValue() : Promise<any> {
    if (!this.inputValue?._id){
      console.log("I am optimus prime")
      let userCreateApi = await this.api.userCreateApi(
        {
          userName: this.userData.userName,
          firstName: "testing",
          lastName: "testing",
          email:  this.userData.userEmail,
          password: "testing"
      }
      ).pipe(
        map((response: any) => {
          console.log("add-todo-model.component.ts says that response after create is this : ", response);
          // this.noData = response.data.length === 0 ? true : false;
          // this.taskList = response?.data
          this.outputValue.emit({data:"response"});
          return response; // Forward the response to the next operator
        }),
        catchError((error) => {
          // Handle error response here
          console.error('API Error:', error);
          alert(error.error.message || error.statusText)
          this.outputValue.emit({data:"response"});
          throw error; // Re-throw the error to propagate it
          // Alternatively, you can return a default value or another Observable here
          // return of(defaultValue); // Return a default value
          // return throwError('Error occurred'); // Return another Observable
        })
      ).subscribe({
          next: (data) => {
            console.log('API Response:', data);
            // this.loader = false;
            // Handle the response data here
          },
          error: (error) => {
            console.error('API Error:', error);
            // this.loader = false;
            // Handle any errors here
          }
        });
        // this.outputValue.emit({data:"response"});
      } else {
        console.log("I am megatron.",{
          id : this.inputValue._id,
            userName: this.userData.userName,
            firstName: "testing",
            lastName: "testing",
            email:  this.userData.userEmail,
            password: "testing"
      })
        let todoListApi = await this.api.userUpdateApi(
          {
            id : this.inputValue._id,
              userName: this.userData.userName,
              firstName: "testing",
              lastName: "testing",
              email:  this.userData.userEmail,
              password: "testing"
        }
        ).pipe(
          map((response: any) => {
            console.log("add-query-model.component.ts says that response is this : ", response);
            // this.noData = response.data.length === 0 ? true : false;
            // this.taskList = response?.data
            this.outputValue.emit({data:"response"});
            return response; // Forward the response to the next operator
          }),
          catchError((error) => {
            // Handle error response here
            console.error('API Error:', error);
            alert(error.error.message || error.statusText)
            this.outputValue.emit({data:"response"});
            throw error; // Re-throw the error to propagate it
            // Alternatively, you can return a default value or another Observable here
            // return of(defaultValue); // Return a default value
            // return throwError('Error occurred'); // Return another Observable
          })
        ).subscribe({
            next: (data) => {
              console.log('API Response:', data);
              // this.loader = false;
              // Handle the response data here
            },
            error: (error) => {
              console.error('API Error:', error);
              // this.loader = false;
              // Handle any errors here
            }
          });
          // this.outputValue.emit({data:"response"});
      }


    // let userListValue = JSON.parse(<any>localStorage.getItem('userList'));
    // let loggedInUserData = JSON.parse(<any>localStorage.getItem('loggedInUser'));
    // if (this.isEdit === true) {
    //   if (this.inputValue) {
    //     let filteredData = userListValue.forEach((data: any, index: number) => {
    //       if (data.userEmail === this.inputValue.userEmail) {
    //         userListValue[index].userEmail = this.userData.userEmail;
    //         userListValue[index].userName = this.userData.userName;
    //         userListValue[index].userRole = this.userData.userRole;
    //         localStorage.setItem('userList', JSON.stringify(userListValue));
    //         this.outputValue.emit({
    //           userEmail: this.userData.userEmail,
    //           userName: this.userData.userName,
    //           description: this.userData.userRole,
    //         });
    //       }
    //     });
    //     this.inputValue = null;
    //     this.userData.userEmail = '';
    //     this.userData.userName = '';
    //     this.userData.userRole = '';
    //     this.userNameInput.nativeElement.value = '';
    //     this.userEmailInput.nativeElement.value = '';
    //     this.myForm.resetForm();
    //     return;
    //   }
    // }
    // userListValue.push(this.userData);
    // localStorage.setItem('userList',JSON.stringify(userListValue));
    // this.outputValue.emit(this.userData);
    // this.myForm.reset();
    // this.userNameInput.nativeElement.value = '';
    // this.userEmailInput.nativeElement.value = '';
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
