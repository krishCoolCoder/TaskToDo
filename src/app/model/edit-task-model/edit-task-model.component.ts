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

@Component({
  selector: 'app-edit-task-model',
  templateUrl: './edit-task-model.component.html',
  styleUrls: ['./edit-task-model.component.css']
})
export class EditTaskModelComponent {
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

  constructor ( private api: ApiService ) {}

  ngOnInit(): void {
        this.taskNo = this.inputValue.taskNo;
        this.title = this.inputValue.taskTitle;
        this.description = this.inputValue?.taskDescription;
        this.status = this.inputValue.taskStatus;
        this.editView = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    try {
          this.editView = true;
          this.status = this.inputValue?.taskStatus;
          this.taskTitle.nativeElement.value = this.inputValue?.taskTitle || '';
          this.taskDescription.nativeElement.value = this.inputValue.taskDescription || '';
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
    let data = value.target as HTMLParagraphElement;
    this.status = data.textContent;
  }

   async giveInputValue(): Promise<any> {
    let currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));

      this.title = this.taskTitle.nativeElement.value;
      this.description = this.taskDescription.nativeElement.value;
      let taskDeleteApi = await this.api.taskUpdateApi(
        {
          id : this.inputValue._id,
          taskTitle: this.title,
          taskDescription: this.description,
          taskStatus: this.status || this.inputValue.taskStatus,
          taskUpdatedBy: currentUser.data[0]._id
        }
      ).pipe(
        map((response: any) => {
          console.log("The response of the api is this : ", response);
          this.outputValue.emit({data: response});
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
  }

  onSubmit() {
    this.taskTitle.nativeElement.value = '';
    this.taskDescription.nativeElement.value = '';
    this.myForm.resetForm();
  }

  onModalClose() {
    this.editView = false;
    if (this.isEdit === false) {
      this.title = '';
      this.description = '';
      this.taskTitle.nativeElement.value = '';
      this.taskDescription.nativeElement.value = '';
    }
  }
}
