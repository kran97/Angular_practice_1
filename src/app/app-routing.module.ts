import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth/auth.component';
import { ConcatMapComponent } from './components/concat-map/concat-map.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { HttpRequestsComponent } from './components/http-requests/http-requests.component';
import { MenuComponent } from './components/menu/menu.component';
import { MergeMapComponent } from './components/merge-map/merge-map.component';
import { PipesPracticeComponent } from './components/pipes-practice/pipes-practice.component';
import { PipesComponent } from './components/pipes/pipes.component';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { TemplateFormComponent } from './components/template-form/template-form.component';
import { TemplateTestComponent } from './components/template-test/template-test.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth', component: AuthComponent
  },
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard], children: [
      {
        path: '', component: MenuComponent
      },
      {
        path: 'home', component: HomeComponent
      },
      {
        path: 'templateDrivenForm', component: TemplateFormComponent
      },
      {
        path: 'reactiveForm', component: ReactiveFormComponent
      },
      {
        path: 'pipes', component: PipesComponent
      },
      {
        path: 'pipesPractice', component: PipesPracticeComponent
      },
      {
        path: 'httpRequests', component: HttpRequestsComponent
      },
      {
        path: 'mergeMap', component: MergeMapComponent
      },
      {
        path: 'concatMap', component: ConcatMapComponent
      },
      {
        path: 'templateOutletTest', component: TemplateTestComponent
      }
    ]
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
