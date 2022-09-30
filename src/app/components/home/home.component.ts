import { AfterContentChecked, AfterContentInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentInit, AfterContentChecked, AfterViewInit {

  bool: boolean = false;

  items = ['Cherry', 'Orange', 'Apple'];

  @Input() template!: TemplateRef<any>;
  @ContentChild('content') cont!: ElementRef;
  @ViewChild('content') view!: ElementRef;

  constructor(private changeDetecRef: ChangeDetectorRef) {}

  count = 0;

  ngOnInit(): void {
    // console.log("HomeComponent OnInit --> " + this.cont);
    //Produces Error
    // console.log("HomeComponent AfterViewInit --> " + this.vont.nativeElement.textContent);
  }

  ngAfterContentInit(): void {
    // console.log("HomeComponent AfterContentInit --> " + this.cont);
  }

  ngAfterContentChecked(): void {
    // console.log("HomeComponent AfterContentChecked");
  }

  ngAfterViewInit(): void {
    // console.log("HomeComponent AfterViewInit --> " + this.view.nativeElement.textContent);
  }

  detach() {
    this.changeDetecRef.detach();
  }

  reattach() {
    this.changeDetecRef.reattach();
  }

  detectChanges() {
    this.changeDetecRef.detectChanges();
  }

  markForCheck() {
    this.changeDetecRef.markForCheck();
  }

  increment() {
    this.count++;
  }

}
