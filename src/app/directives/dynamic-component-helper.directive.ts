import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicComponentHelper]'
})
export class DynamicComponentHelperDirective {

  constructor(public viewContRef: ViewContainerRef) { }

}
