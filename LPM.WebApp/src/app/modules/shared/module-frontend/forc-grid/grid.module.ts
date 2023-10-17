import { NgModule } from '@angular/core';
import { GridComponent } from './grid.component';
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';

@NgModule({
	imports:[
		DxDataGridModule,
		DxButtonModule
	],
	declarations:[
		GridComponent
	],
	exports: [
		GridComponent
	],
	providers: [

	]
})
export class GridModule {

}