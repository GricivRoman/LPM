import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-required-star',
	template: '<span *ngIf="required" style="color: red;">*</span>',
})
export class RequiredStarComponent {
	@Input()
		required: boolean;
}