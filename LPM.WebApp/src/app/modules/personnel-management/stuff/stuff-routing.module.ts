import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StuffComponent } from './stuff.component';

const routes: Routes = [
	{
		path: '',
		component: StuffComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class StuffRoutingModule { }