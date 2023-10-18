import { Component, Input } from '@angular/core';
import { Guid } from 'guid-typescript';

@Component({
	selector: 'app-organization',
	templateUrl: 'organization.component.html'
})
export class OrganizationComponent {
	@Input()
		userId?: Guid;
}