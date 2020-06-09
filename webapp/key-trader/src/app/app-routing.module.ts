import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginPageComponent} from './components/login-page/login-page.component';
import {ServersPageComponent} from './components/servers-page/servers-page.component';
import {AddKeyPageComponent} from './components/add-key-page/add-key-page.component';
import {SeeKeysPageComponent} from './components/see-keys-page/see-keys-page.component';
import {ChangeRolesComponent} from './components/change-roles/change-roles.component';
import {AuthGuard} from './Auth/auth.guard';
import {ViewRolesComponent} from './components/view-roles/view-roles.component';
import {LoggedOutComponent} from './components/logged-out/logged-out.component';
import {NormalAuthGuard} from './Auth/auth-2.guard';
import {ProfilePageComponent} from './components/profile-page/profile-page.component';

const routes: Routes = [
  {path: '', component: ServersPageComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginPageComponent},
  {path: 'add-key', component: AddKeyPageComponent, canActivate: [NormalAuthGuard]},
  {path: 'see-keys', component: SeeKeysPageComponent, canActivate: [NormalAuthGuard]},
  {path: 'view-roles', component: ViewRolesComponent, canActivate: [NormalAuthGuard]},
  {path: 'settings', component: ChangeRolesComponent, canActivate: [NormalAuthGuard]},
  {path: 'profile-page', component: ProfilePageComponent},
  {path: 'logged-out', component: LoggedOutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule { }
