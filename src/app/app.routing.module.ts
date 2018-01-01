import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//path
import { IncomingIcoComponent } from './component/incoming-ico/incoming-ico.component';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent} from './component/registration/registration.component';
import { AuthenticationGuard } from './authentication/authentication.guard';

const routes: Routes = [
  { path: 'ICOS', component: IncomingIcoComponent, canActivate: [AuthenticationGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }