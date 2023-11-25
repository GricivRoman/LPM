import { Component } from '@angular/core';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { BaseButtonComponent } from '../base-button.component';

@Component({
	selector: 'app-filter-btn',
	template: '<button class="button filter-button" [ngClass]="buttonClasses" [disabled]="disabled"><fa-icon [icon]="icon"></fa-icon></button>',
	styleUrls: ['../base-button.component.css']
})
export class FilterButtonComponent extends BaseButtonComponent {
	private activeFilterClass = 'filter-active';

	private _filterIsActive: boolean = false;
	set filterIsActive(filterIsActive: boolean) {
		this._filterIsActive = filterIsActive;
		if(filterIsActive){
			this.buttonClasses.push(this.activeFilterClass);
		} else {
			this.buttonClasses = this.buttonClasses.filter(x => x !== this.activeFilterClass);
		}
	}
	get filterIsActive(): boolean{
		return this._filterIsActive;
	}

	icon = faFilter;
}