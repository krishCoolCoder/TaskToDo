import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  NgZone
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-update-task-status-model',
  templateUrl: './update-task-status-model.component.html',
  styleUrls: ['./update-task-status-model.component.css']
})
export class UpdateTaskStatusModelComponent {
  @ViewChild('myForm')
  myForm!: NgForm;

  @ViewChild('taskProgress')
  taskProgress!: ElementRef;

  @Output()
  outputValue: any = new EventEmitter<string>();

  @Input()
  inputValue: any;

  @Input()
  isEdit?: boolean;

  @ViewChild('exampleModalCenter') modalElement!: ElementRef;

  taskNo: any = 0;
  title: string = '';
  description: string = '';
  status?: string | undefined | null = '';
  progress ?: number;

  editView: boolean = false;

  constructor ( private api: ApiService ) {}

  ngOnInit(): void {
    // console.log(
    //   'The value of inputValue in ngOnInit() child component is this : ',
    //   this.inputValue,
    //   ' and the isEdit is this : ',
    //   this.isEdit
    // );
    console.log("ppppppp[p The value of this.inputValue is this : ", this.inputValue)
    if (this.isEdit) {
      console.log("Into the if : ")
        this.taskNo = this.inputValue.taskNo;
        this.title = this.inputValue.taskTitle;
        this.description = this.inputValue?.taskDescription;
        this.status = this.inputValue.taskStatus;
        this.progress = this.inputValue.taskProgress
        this.editView = true;
    } else {
      this.taskNo = '';
      this.title = '';
      this.description = '';
      this.status = '';
      this.editView = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    try {
      console.log(
        'The value of inputValue in gOnChanges() child component is this : ',
        this.inputValue,
        ' and the isEdit is this : ',
        this.isEdit
      );
      console.log("The taskProgress in ngOnChanges is this : ", this.inputValue.taskProgress);
      if (this.isEdit) {
        console.log("Into the if : ")
          // this.taskNo = this.inputValue.taskNo;
          // this.title = this.inputValue.taskTitle;
          // this.description = this.inputValue?.taskDescription;
          // this.status = this.inputValue.taskStatus;
          // this.editView = true;
          this.editView = true;
          this.status = this.inputValue?.taskStatus;
          console.log("The value of taskProgress is this : ", this.taskProgress)
          this.status = this.inputValue.taskProgress || '';
          this.progress = this.inputValue.taskProgress;
          console.log("The value of thi progress inside the if is : ", this.progress)
      } else {
        this.taskNo = '';
        this.title = '';
        this.description = '';
        this.status = '';
        this.progress = 0
        this.editView = false;
      }
      // this.taskTitle = this.inputValue.title;
      // this.taskDescription = this.inputValue.description;
      // if (this.isEdit === true) {
      //   if (this.inputValue.taskNo) {
      //     // console.log('Into the if on true on ngOnChanges');
      //     this.taskNo = this.inputValue.taskNo;
      //     this.title = this.inputValue.title;
      //     this.description = this.inputValue.description;
      //     this.taskTitle.nativeElement.value = this.inputValue?.title || '';
      //     this.taskDescription.nativeElement.value =
      //       this.inputValue.description || '';
      //     this.status = this.inputValue.status;
      //     this.editView = true;
      //   }
      // } else if (this.isEdit === false) {
      //   // console.log('Into the else if on false on ngOnChanges');
      //   this.taskTitle.nativeElement.value = '';
      //   this.taskDescription.nativeElement.value = '';
      //   this.taskNo = '';
      //   this.title = '';
      //   this.description = '';
      //   this.status = '';
      //   this.editView = false;
      // }
    } catch (error: any) {
      console.log('The error is this : ', error);
    }
  }

  formTitle(event: any): any {
    this.title = event?.target.value;
  }
  formDescription(event: any): any {
    this.description = event?.target.value;
  }

  updateStatus(value: any): any {
    // console.log('The value is this : ', value.target as HTMLParagraphElement);
    let data = value.target as HTMLParagraphElement;
    this.status = data.textContent;
  }

   async giveInputValue(): Promise<any> {
    // console.log("The value of this.taskProgress.nativeElement.value is this : ",this.taskProgress?.nativeElement?.value);
    // if (this.isEdit) {
    //   console.log("Into the if : ")
    //     this.taskNo = this.inputValue.taskNo;
    //     this.title = this.inputValue.taskTitle;
    //     this.description = this.inputValue?.taskDescription;
    //     this.status = this.inputValue.taskStatus;
    //     this.editView = true;
    // } else {
    //   this.taskNo = '';
    //   this.title = '';
    //   this.description = '';
    //   this.status = '';
    //   this.editView = false;
    // }
    console.log("Into the giveInputValue on add-task-model and the value of inputValue : ",this.inputValue)
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
    if (!this.inputValue?._id) {
    alert("Unable to update the status, Kindly try again.")
    } else if (this.inputValue?._id) {
      console.log("The taskTitle is this : ", this.title)
      let taskDeleteApi = await this.api.taskStatusUpdateApi(
        {
          id : this.inputValue._id,
          taskProgress: this.taskProgress?.nativeElement?.value || this.inputValue.taskStatus,
          taskStatus: this.status|| this.inputValue.taskStatus,
          taskUpdatedBy: currentUser.data[0]._id
          // organisationRef : organisationTeamMapping.currentOrganisation,
          // teamRef : organisationTeamMapping.currentTeam
        }
      ).pipe(
        map((response: any) => {
          console.log("The response of the api is this : ", response);
          this.outputValue.emit({data: response});
          // this.noData = response.data.length === 0 ? true : false;
          // this.taskList = response?.data
          return response; // Forward the response to the next operator
        }),
        catchError((error) => {
          // Handle error response here
          console.error('API Error:', error);
          alert(error.error.message || error.statusText)
          this.outputValue.emit({data: "response"});
          throw error; // Re-throw the error to propagate it
          // Alternatively, you can return a default value or another Observable here
          // return of(defaultValue); // Return a default value
          // return throwError('Error occurred'); // Return another Observable
        })).subscribe({
          next: (data) => {
            console.log('API Response:', data);
            // Handle the response data here
          },
          error: (error) => {
            console.error('API Error:', error);
            // Handle any errors here
          }
        });
        this.outputValue.emit({data: "response"});
        console.log("The response of api hit attempt is this : ",taskDeleteApi)
    }
    // let userTasks = JSON.parse(<any>localStorage.getItem('userTasks'));
    // let organisationTeamMapping = JSON.parse(<any>localStorage.getItem('currentOrganisationTeamRef'));
    // console.log("The organisationTeamMapping is this : ", organisationTeamMapping.currentOrganisation, " and ",organisationTeamMapping.currentTeam)
    // if (organisationTeamMapping === null || organisationTeamMapping.currentTeam === undefined || organisationTeamMapping.currentOrganisation === undefined ) {
    //   alert("Kindly select organisation/account type and team.");
    //   return;
    // }
    // let loggedInUserData = JSON.parse(
    //   <any>localStorage.getItem('loggedInUser')
    // );
    // if (this.isEdit === true) {
    //   if (this.inputValue !== false) {
    //     this.editView = true;
    //     // console.log('Into the if : ');
    //     let filteredData = userTasks.forEach((data: any, index: number) => {
    //       if (data.taskNo === this.inputValue.taskNo) {
    //         userTasks[index] = {
    //           taskNo: this.inputValue.taskNo,
    //           title: this.title,
    //           description: this.description,
    //           status: this.status == '' ? 'Created' : this.status,
    //           assignedBy: loggedInUserData.userName,
    //           organisationRef : organisationTeamMapping.currentOrganisation,
    //           currentTeamRef : organisationTeamMapping.currentTeam
    //         };
    //         localStorage.setItem('userTasks', JSON.stringify(userTasks));
    //         this.outputValue.emit({
    //           taskNo: this.taskNo,
    //           title: this.title,
    //           description: this.description,
    //           status: this.status == '' ? 'Created' : this.status,
    //           assignedBy: loggedInUserData.userName,
    //           organisationRef : organisationTeamMapping.currentOrganisation,
    //           currentTeamRef : organisationTeamMapping.currentTeam
    //         });
    //       }
    //     });
    //     this.inputValue = null;
    //     this.title = '';
    //     this.description = '';
    //     this.taskTitle.nativeElement.value = '';
    //     this.taskDescription.nativeElement.value = '';
    //     this.myForm.resetForm();
    //     // this.taskNo = "";
    //     return;
    //   }
    // }
    // this.taskNo = Math.floor(Math.random() * 9000) + 1000;
    // userTasks.push({
    //   taskNo: this.taskNo,
    //   title: this.title,
    //   description: this.description,
    //   status: 'Created',
    //   assignedBy: loggedInUserData.userName,
    //   organisationRef : organisationTeamMapping.currentOrganisation,
    //   currentTeamRef : organisationTeamMapping.currentTeam
    // });
    // localStorage.setItem('userTasks', JSON.stringify(userTasks));
    this.outputValue.emit({
      taskNo: this.taskNo
    });
    // this.description = '';
    // this.title = '';
    // this.taskNo = 0;
    // this.taskTitle.nativeElement.value = '';
    // this.taskDescription.nativeElement.value = '';
  }

  onSubmit() {
    this.myForm.resetForm();
  }

  onModalClose() {
    // Handle the modal close event here
    // console.log('Modal closed');
    // Add your logic here
    this.editView = false;
    // console.log(
    //   'Into the onModelClose() and the inputValue is this : ',
    //   this.inputValue
    // );
    if (this.isEdit === false) {
      // this.inputValue = null;
      this.title = '';
      this.description = '';
    }
  }
  getProgressValue(event: any) {
    console.log("The event value is this : ", event.target.value)
    this.progress = event.target.value;
  }
}
