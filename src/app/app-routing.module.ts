import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ManagerComponent } from './components/manager/manager.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard, Roleguard } from './_guards';


const routes: Routes = [
  {path: '', component: MainLayoutComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'manager', component: ManagerComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard, Roleguard],},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
