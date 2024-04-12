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
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { catchError, map } from 'rxjs/operators';
import { FilterService } from 'src/app/service/filter.service';
@Component({
  selector: 'app-add-task-model',
  templateUrl: './add-task-model.component.html',
  styleUrls: ['./add-task-model.component.css'],
})
export class AddTaskModelComponent implements OnInit, OnChanges {
  @ViewChild('myForm')
  myForm!: NgForm;
  @ViewChild('taskTitle')
  taskTitle!: ElementRef;
  @ViewChild('taskDescription')
  taskDescription!: ElementRef;

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

  editView: boolean = false;

  constructor ( private api: ApiService, private filter : FilterService ) {}

  ngOnInit(): void {
    if (this.isEdit) {
        this.taskNo = this.inputValue.taskNo;
        this.title = this.inputValue.taskTitle;
        this.description = this.inputValue?.taskDescription;
        this.status = this.inputValue.taskStatus;
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
      if (this.isEdit) {
          this.editView = true;
          this.status = this.inputValue?.taskStatus;
          this.taskTitle.nativeElement.value = this.inputValue?.taskTitle || '';
          this.taskDescription.nativeElement.value = this.inputValue.taskDescription || '';
      } else {
        this.taskNo = '';
        this.title = '';
        this.description = '';
        this.status = '';
        this.editView = false;
      }
    } catch (error: any) {
    }
  }

  formTitle(event: any): any {
    this.title = event?.target.value;
  }
  formDescription(event: any): any {
    this.description = event?.target.value;
  }

  updateStatus(value: any): any {
    let data = value.target as HTMLParagraphElement;
    this.status = data.textContent;
  }

   async giveInputValue(): Promise<any> {
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
    if (!this.inputValue?._id) {
    let taskDeleteApi = await this.api.taskCreateApi(
      {
        taskTitle: this.title,
        taskDescription: this.description,
        taskStatus: this.status == '' ? 'Created' : this.status,
        projectRef : this.filter.getProjectId(),
        teamRef : this.filter.getTeamId(),
        organisationRef : this.filter.getOrganisationId(),
        taskCreatedBy: currentUser.data[0]._id
        // organisationRef : organisationTeamMapping.currentOrganisation,
        // teamRef : organisationTeamMapping.currentTeam
      }
    ).pipe(
      map((response: any) => {
        this.outputValue.emit({data: "response"});
        return response; // Forward the response to the next operator
      }),
      catchError((error) => {
        // Handle error response here
        alert(error.error.message || error.statusText)
        this.outputValue.emit({data: "response"});
        throw error; // Re-throw the error to propagate it
        // Alternatively, you can return a default value or another Observable here
        // return of(defaultValue); // Return a default value
        // return throwError('Error occurred'); // Return another Observable
      })).subscribe({
        next: (data) => {
          // Handle the response data here
        },
        error: (error) => {
          // Handle any errors here
        }
      });
    } else if (this.inputValue?._id) {
      this.title = this.taskTitle.nativeElement.value;
      this.description = this.taskDescription.nativeElement.value;
      let taskDeleteApi = await this.api.taskUpdateApi(
        {
          id : this.inputValue._id,
          taskTitle: this.title,
          taskDescription: this.description,
          taskStatus: this.status || this.inputValue.taskStatus,
          projectRef : this.filter.getProjectId(),
          teamRef : this.filter.getTeamId(),
          organisationRef : this.filter.getOrganisationId(),
          taskUpdatedBy: currentUser.data[0]._id
          // organisationRef : organisationTeamMapping.currentOrganisation,
          // teamRef : organisationTeamMapping.currentTeam
        }
      ).pipe(
        map((response: any) => {
          this.outputValue.emit({data: response});
          return response; // Forward the response to the next operator
        }),
        catchError((error) => {
          // Handle error response here
          alert(error.error.message || error.statusText)
          this.outputValue.emit({data: "response"});
          throw error; // Re-throw the error to propagate it
          // Alternatively, you can return a default value or another Observable here
          // return of(defaultValue); // Return a default value
          // return throwError('Error occurred'); // Return another Observable
        })).subscribe({
          next: (data) => {
            // Handle the response data here
          },
          error: (error) => {
            // Handle any errors here
          }
        });
        this.outputValue.emit({data: "response"});
    }
    this.outputValue.emit({
      taskNo: this.taskNo
    });
  }

  onSubmit() {
    this.taskTitle.nativeElement.value = '';
    this.taskDescription.nativeElement.value = '';
    this.myForm.resetForm();
  }

  onModalClose() {
    // Handle the modal close event here
    // Add your logic here
    this.editView = false;
    if (this.isEdit === false) {
      // this.inputValue = null;
      this.title = '';
      this.description = '';
      this.taskTitle.nativeElement.value = '';
      this.taskDescription.nativeElement.value = '';
    }
  }
}
