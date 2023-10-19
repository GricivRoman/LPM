import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutGuard } from './modules/personnel-management/authentication/authGuard';

const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import ('./modules/personnel-management/authentication/authentication.module').then(m => m.AuthenticationModule)
	},
	{
		path: 'employees',
		loadChildren: () => import ('./modules/personnel-management/stuff/stuff.module').then(m => m.StuffModule),
		canActivate: [AutGuard]
	},
	{
		path: 'org-structure',
		loadChildren: () => import ('./modules/personnel-management/org-structure/orgStructire.module').then(m => m.OrgStructureModule),
		canActivate: [AutGuard]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
