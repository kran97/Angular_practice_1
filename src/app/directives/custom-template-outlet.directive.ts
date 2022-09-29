import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appCustomTemplateOutlet]'
})
export class CustomTemplateOutletDirective implements OnChanges {

  @Input() appCustomTemplateOutlet!: TemplateRef<any>;
  @Input('appCustomTemplateOutletContext') context: any;

  constructor(private vcRef: ViewContainerRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);

    let currentTemplate = changes['appCustomTemplateOutlet'].currentValue;
    // console.log(currentTemplate instanceof TemplateRef); // true if template is there.
    if (currentTemplate instanceof TemplateRef) {
      console.log(this.context);
      this.vcRef.createEmbeddedView(this.appCustomTemplateOutlet, this.context);
    }
  }

}
