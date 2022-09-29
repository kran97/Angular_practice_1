import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {

  genders = ['male', 'female', 'others'];
  signUpForm!: FormGroup;
  forbiddenUsernames = ['Karen', 'Kiran'];
  submitted = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    /** Using Form Builder */
    // this.signUpForm = this.fb.group({
    //   username: ['', [Validators.required, this.arrowForbiddenNamesFunc]],
    //   email: [null, [Validators.required, Validators.email], this.asyncForbiddenUsernames.bind(this)],
    //   questionGroup: this.fb.group({
    //     secret: ['select', [Validators.required]],
    //     quesAns: [null, [Validators.required]]
    //   }),
    //   hobbies: this.fb.array([]),
    //   gender: [null, [Validators.required]]
    // });

    // console.log("OnInit --> ", this);

    /** Using Form Group */
    this.signUpForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, this.arrowForbiddenNamesFunc]),
      'email': new FormControl(null, [Validators.required, Validators.email], this.asyncForbiddenUsernames.bind(this)),
      'questionGroup': new FormGroup({
        'secret': new FormControl('select', [Validators.required]),
        'quesAns': new FormControl(null, [Validators.required])
      }),
      'hobbies': new FormArray([]),
      'gender': new FormControl('others')
    });
    // this.signUpForm.valueChanges.subscribe((value) => {
    //   console.log(value);
    // });
    // this.signUpForm.statusChanges.subscribe((status) => {
    //   console.log(status)
    // });
  }

  forbiddenNamesFunc(control: FormControl): { [s: string]: boolean } | null {
    // console.log("normal function --> ", this);
    if (this.forbiddenUsernames.includes(control.value)) {
      return { 'nameIsForbidden': true };
    }
    return null;
  }

  /**
   * 
   * @param control Contains the control name.
   * @returns ValidationErrors or null.
   * ValidationErrors is in form ==> { [key: string]: any }
   * Here it is specifically ==> { [key: string]: boolean }
   * Which means it either returns a key value pair, where
   * Key is string and value is boolean or if no error,
   * Then it returns null.
   */
  arrowForbiddenNamesFunc = (control: AbstractControl): ValidationErrors | null => {
    // console.log("Arrow function --> ", this);
    if (this.forbiddenUsernames.includes(control.value)) {
      return { 'nameIsForbidden': true };
    }
    return null;
  }

  asyncForbiddenUsernames(control: AbstractControl): Promise<ValidationErrors> | Observable<ValidationErrors> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ 'emailIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 2000);
    });
    return promise;
  }

  onSubmit(): void {
    console.log(this.signUpForm);
    this.submitted = true;
  }

  onReset(): void {
    this.signUpForm.reset();
    this.submitted = false;
  }

  getControl(controlName: string): AbstractControl {
    return this.signUpForm.get(controlName)!;
  }

  get getControls(): AbstractControl[] {
    return (<FormArray>this.signUpForm.get('hobbies')).controls;
  }

  onAddHobby(): void {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(control);
  }
}
