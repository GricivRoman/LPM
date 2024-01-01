import { Component } from '@angular/core';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { BaseButtonComponent } from '../base-button.component';

@Component({
	selector: 'app-export-btn',
	template: '<button class="button export-button" [ngClass]="buttonClasses" [disabled]="disabled"><fa-icon [icon]="icon"></fa-icon></button>',
	styleUrls: ['../base-button.component.css']
})
export class ExportButtonComponent extends BaseButtonComponent {
	icon = faFileExport;
}