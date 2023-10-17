import { Component, Input, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-base-btn',
	template: ''
})
export abstract class BaseButtonComponent implements OnInit {
	@Input()
		disabled: boolean;

	abstract icon: IconDefinition;
	buttonClasses: string[] = [];

	ngOnInit(): void {
		if(this.disabled){
			this.buttonClasses.push('button-disabled');
		}
	}
}