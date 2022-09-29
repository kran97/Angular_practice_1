import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpRequestsComponent } from './http-requests.component';

describe('HttpRequestsComponent', () => {
  let component: HttpRequestsComponent;
  let fixture: ComponentFixture<HttpRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
