import { Component } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { BaseButtonComponent } from '../base-button.component';

@Component({
	selector: 'app-add-btn',
	template: '<button class="button add-button" [ngClass]="buttonClasses" [disabled]="disabled"><fa-icon [icon]="icon"></fa-icon></button>',
	styleUrls: ['../base-button.component.css']
})
export class AddButtonComponent extends BaseButtonComponent {
	icon = faPlus;
}