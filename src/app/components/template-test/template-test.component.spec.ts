import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateTestComponent } from './template-test.component';

describe('TemplateTestComponent', () => {
  let component: TemplateTestComponent;
  let fixture: ComponentFixture<TemplateTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
