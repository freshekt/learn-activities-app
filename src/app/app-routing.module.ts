import { LoginComponent } from './login/components/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { ActivitiesComponent } from './main/components/main/activities.component';
import { AuthGuard } from './login/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: ActivitiesComponent,
  //  canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
