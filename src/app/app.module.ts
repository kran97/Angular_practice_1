import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChildOneComponent } from './components/child-one/child-one.component';
import { TemplateFormComponent } from './components/template-form/template-form.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { PipesComponent } from './components/pipes/pipes.component';
import { ShortenPipe } from './pipes/shorten.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { PipesPracticeComponent } from './components/pipes-practice/pipes-practice.component';
import { ReverseWordPipe } from './pipes/reverse-word.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { HttpRequestsComponent } from './components/http-requests/http-requests.component';
import { PostService } from './services/post.service';
import { AuthInterceptorInterceptor } from './services/auth-interceptor.interceptor';
import { LoggingInterceptor } from './services/logging.interceptor';
import { AuthComponent } from './components/auth/auth/auth.component';
import { MergeMapComponent } from './components/merge-map/merge-map.component';
import { ConcatMapComponent } from './components/concat-map/concat-map.component';
import { TemplateTestComponent } from './components/template-test/template-test.component';
import { CustomTemplateOutletDirective } from './directives/custom-template-outlet.directive';
import { AlertComponent } from './components/alert/alert.component';
import { DynamicComponentHelperDirective } from './directives/dynamic-component-helper.directive';
import { LoadingSpinnerComponent } from 'src/assets/loading-spinner/loading-spinner';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    ChildOneComponent,
    TemplateFormComponent,
    HomeComponent,
    MenuComponent,
    ReactiveFormComponent,
    PipesComponent,
    ShortenPipe,
    FilterPipe,
    PipesPracticeComponent,
    ReverseWordPipe,
    SortPipe,
    HttpRequestsComponent,
    AuthComponent,
    MergeMapComponent,
    ConcatMapComponent,
    TemplateTestComponent,
    CustomTemplateOutletDirective,
    AlertComponent,
    DynamicComponentHelperDirective,
    LoadingSpinnerComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    PostService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: LoggingInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent],
  // entryComponents: [
  //   AlertComponent
  // ]
})
export class AppModule {}
