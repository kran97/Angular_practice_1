import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AppComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  title = 'practice';

  isAuthenticated = false;
  userSub!: Subscription;
  isActive = false;

  constructor(private authServ: AuthenticationService, private changeDetectRef: ChangeDetectorRef, private router: Router) {
    // console.log("Constructor");
  }

  async ngOnInit(): Promise<void> {
    // let newVal;
    // this.promise.then((val) => {
    //   newVal = val;
    //   console.log("OnInit INSIDE of then ", val);
    // });
    // console.log("OnInit OUTSIDE of then ", newVal);
    // let pro = await this.promise;
    // console.log("OnInit, right after promise resolves ", pro);
    // console.log("On Init");

    // this.router.events.pipe(
      // filter(event => event instanceof RoutesRecognized)
    // ).subscribe((event) => console.log(event));

    this.userSub = this.authServ.userSubject.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
    this.authServ.autoLogin();
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log("On Changes");
  }
  ngDoCheck(): void {
    // console.log("Do Check");
  }
  ngAfterViewInit(): void {
    // console.log("After View Init");
  }
  ngAfterViewChecked(): void {
    // console.log("After View Checked");
  }
  ngAfterContentInit(): void {
    // console.log("After Content Init");
  }
  ngAfterContentChecked(): void {
    // console.log("After Content Checked");
  }
  ngOnDestroy(): void {
    // console.log("On Destroy");
    this.userSub.unsubscribe();
  }

  onLogout(): void {
    this.authServ.logout();
  }

  // promise = new Promise<any>((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(
  //       1
  //     );
  //     console.log("Promise resolved!!")
  //   }, 2000);
  // });

  // fun = (function() {
  //   console.log("This is synchronous");
  // })();
}
