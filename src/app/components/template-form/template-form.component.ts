import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {

  defaultQuestion = 'pet';
  answer?: string;
  genders = ['male', 'female', 'others'];
  @ViewChild('sampleForm') viewChildForm!: NgForm;

  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };

  submitted = false;

  constructor() { }

  ngOnInit(): void {
  }

  suggestUsername() {
    const suggestedUsername = 'SuperUser';
    // Way 1 to set form username/all/one field(s) with suggested username/any input.
    // this.viewChildForm.setValue({
    //   username: suggestedUsername,
    //   email: '',
    //   questionGroup: {
    //     secret: '',
    //     quesAns: ''
    //   },
    //   gender: ''
    // });

    // Way 2 to set just one particular field from ts file.
    this.viewChildForm.form.patchValue({
      username: suggestedUsername
    });
  }

  submit(form: NgForm): void {
    // console.log(this.viewChildForm);
    console.log(form);
    
    this.submitted = true;
    this.user.username = form.value.username;
    this.user.email = form.value.email;
    this.user.secretQuestion = form.value.questionGroup.secret;
    this.user.answer = form.value.questionGroup.quesAns;
    this.user.gender = form.value.gender;
    
    // form.reset();
    // Or this can be done.
    // this.viewChildForm.reset();
  }

}
