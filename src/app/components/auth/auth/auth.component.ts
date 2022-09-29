import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { AuthResponseData } from 'src/app/models/authResponse.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  @ViewChild(AppComponent) appComponent?: AppComponent;

  isLoginMode = true;
  isLoading = false;
  error: string = '';
  authObs?: Observable<AuthResponseData>;

  constructor(private authServ: AuthenticationService, private router: Router) { }

  ngOnInit(): void { }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm): void {
    this.isLoading = true;
    if (this.isLoginMode) {
      this.authObs = this.authServ.signIn(form.value.email, form.value.password);
    } else {
      this.authObs = this.authServ.signUp(form.value.email, form.value.password);
    }
    this.authObs?.subscribe(response => {
      this.isLoading = false;
      this.router.navigate(['/']);
    }, (error) => {
      this.error = error;
      this.isLoading = false;
    });
    form.reset();
  }
}
