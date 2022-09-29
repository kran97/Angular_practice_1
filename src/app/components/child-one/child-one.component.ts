import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-child-one',
  templateUrl: './child-one.component.html',
  styleUrls: ['./child-one.component.scss']
})
export class ChildOneComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() name: string = '';
  @Input() userTemplate!: TemplateRef<any>;
  @ContentChild('content') cont!: ElementRef;
  @ViewChild('view1') viewCh!: ElementRef;

  constructor() { }
  
  ngOnChanges(): void {
    // debugger;
    // console.log("ngOnChanges called!");
  }
  ngOnInit(): void {
    // debugger;
    // console.log("ngOnInit called!");
    //Produces Error
    // console.log("ChildOne OnInit --> " + this.cont.nativeElement.textContent);
  }
  ngDoCheck(): void {
    // debugger;
    // console.log("ngDoCheck called!");
  }
  ngAfterContentInit(): void {
    // debugger;
    // console.log("ngAfterContentInit called!");
    // console.log("ChildOne AfterContentInit --> " + this.cont.nativeElement.textContent);
  }
  ngAfterContentChecked(): void {
    // debugger;
    // console.log("ngAfterContentChecked called!");
  }
  ngAfterViewInit(): void {
    // debugger;
    // console.log("ngAfterViewInit called!");
    // console.log("ChildOne ngAfterViewInit --> " + this.viewCh.nativeElement.textContent);
  }
  ngAfterViewChecked(): void {
    // debugger;
    // console.log("ngAfterViewChecked called!");
  }
  ngOnDestroy(): void {
    // debugger;
    // console.log("ngOnDestroy called!");
  }

}
