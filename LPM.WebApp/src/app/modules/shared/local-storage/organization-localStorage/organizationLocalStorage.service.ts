import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { SelectItem } from '../../models/selectItem';

@Injectable({providedIn: 'root'})
export class OrganizationLocalStorageService {
	$globalOrganization = new BehaviorSubject(this.globalOrganization);

	set globalOrganization(organization: SelectItem | null) {
		this.$globalOrganization.next(organization);
		const value = JSON.stringify(organization);
		localStorage.setItem('globalOrganization', value);
	}

	get globalOrganization(): SelectItem | null{
		return JSON.parse(localStorage.getItem('globalOrganization') as string);
	}

	clearGlobalOrganization(){
		localStorage.removeItem('globalOrganization');
		this.$globalOrganization.next(null);
	}
}