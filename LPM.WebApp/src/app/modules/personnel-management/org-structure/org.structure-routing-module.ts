import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgStructureManagerComponent } from './orgStructureManager/orgStructureManager.component';

const routes: Routes = [
	{
		path: '',
		component: OrgStructureManagerComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class OrgStructureRoutingModule { }