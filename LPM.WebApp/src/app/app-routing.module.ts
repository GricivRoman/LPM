import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutGuard } from './modules/employees-module/authentication/authGuard';

const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import ('./modules/employees-module/authentication/authentication.module').then(m => m.AuthenticationModule)
	},
	{
		path: 'employees',
		loadChildren: () => import ('./modules/employees-module/employees/employees.module').then(m => m.EmployeesModule),
		canActivate: [AutGuard]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
