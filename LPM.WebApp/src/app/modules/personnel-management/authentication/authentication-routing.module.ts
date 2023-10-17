import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login/loginPage.component';
import { CheckInPageComponent } from './checkIn/checkInPage.component';

const routes: Routes = [
	{
		path: 'login',
		component: LoginPageComponent
	},
	{
		path: 'checkin',
		component: CheckInPageComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthenticationRoutingModule { }