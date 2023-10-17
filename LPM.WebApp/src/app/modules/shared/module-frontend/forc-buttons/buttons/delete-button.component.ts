import { Component } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { BaseButtonComponent } from '../base-button.component';

@Component({
	selector: 'app-delete-btn',
	template: '<button class="button delete-button" [ngClass]="buttonClasses" [disabled]="disabled"><fa-icon [icon]="icon"></fa-icon></button>',
	styleUrls: ['../base-button.component.css']
})
export class DeleteButtonComponent extends BaseButtonComponent {
	icon = faTrash;
}