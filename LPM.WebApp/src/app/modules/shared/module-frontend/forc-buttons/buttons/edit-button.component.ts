import { Component } from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { BaseButtonComponent } from '../base-button.component';

@Component({
	selector: 'app-edit-btn',
	template: '<button class="button edit-button" [ngClass]="buttonClasses" [disabled]="disabled"><fa-icon [icon]="icon"></fa-icon></button>',
	styleUrls: ['../base-button.component.css']
})
export class EditButtonComponent extends BaseButtonComponent {
	icon = faPen;
}