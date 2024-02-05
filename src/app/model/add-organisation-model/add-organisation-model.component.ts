import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-organisation-model',
  templateUrl: './add-organisation-model.component.html',
  styleUrls: ['./add-organisation-model.component.css']
})
export class AddOrganisationModelComponent {
  @ViewChild('myForm')
  myForm!: NgForm;
  @ViewChild('organisationNameField')
  organisationNameField!: ElementRef;
  @ViewChild('organisationDescriptionField')
  organisationDescriptionField!: ElementRef;
  
  @Output()
  inputValue : any = new EventEmitter<string>();

  organisationId : any = 0;
  organisationTitle: string = "";
  organisationDescription : string = "";
  organisationAccessControl ?: string | undefined | null = '';

  formOrganisationName(event: any) : any {
    this.organisationTitle = event?.target.value;
  }
  formDescription(event: any) : any {
    this.organisationDescription = event?.target.value;
  }

  updateAccessControl(value: any): any {
    console.log("The value is this : ", value.target  as HTMLParagraphElement);
    let data =  value.target  as HTMLParagraphElement;
    this.organisationAccessControl = data.textContent;
    console.log("The vlue isss : ", this.organisationAccessControl, " and the data is this : ", data)
  }

  giveInputValue() : any {
    let organisationList = JSON.parse(<any>localStorage.getItem('organisationList'));
    let loggedInUserData = JSON.parse(<any>localStorage.getItem('loggedInUser'));
    console.log("The loggedInUerData is this : ", loggedInUserData)
    console.log("The organizationList is this : ", organisationList)
    this.organisationId = Math.floor(Math.random() * 9000) + 1000;
    organisationList.push(
      {
        organisationId : this.organisationId,
        organisationTitle: this.organisationTitle,
        organisationDescription : this.organisationDescription,
        organisationAccessControl : this.organisationAccessControl == '' ? "Private" : this.organisationAccessControl,
        organisationCreatedBy : loggedInUserData.userName
      }
      )
      localStorage.setItem('organisationList',JSON.stringify(organisationList));
      this.inputValue.emit({
        organisationId : this.organisationId,
        organisationTitle: this.organisationTitle,
        organisationDescription : this.organisationDescription,
        organisationAccessControl : this.organisationAccessControl == '' ? "Private" : this.organisationAccessControl ,
        organisationCreatedBy : loggedInUserData.userName
    });
    this.organisationDescription="";
    this.organisationTitle="";
    this.organisationId=0;
    this.organisationNameField.nativeElement.value = "";
    this.organisationDescriptionField.nativeElement.value = "";
    this.myForm.resetForm();
  }
  
  onSubmit() {
    this.organisationNameField.nativeElement.value = "";
    this.organisationDescriptionField.nativeElement.value = "";
    this.myForm.resetForm();
  }
}
