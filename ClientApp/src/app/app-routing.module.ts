import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HomeComponent } from './home/home.component';

const routes : Routes = [

  { path: 'login', component: LoginFormComponent},
  { path: 'home', component: HomeComponent,
    // canActivate:[AuthGuardService]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
