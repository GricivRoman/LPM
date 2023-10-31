import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FillerComponent } from './filler.component';

const routes: Routes = [
	{
		path: '',
		component: FillerComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class FillerRoutingModule { }