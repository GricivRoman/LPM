import { Component } from '@angular/core';
import { FillerService } from './filler.service';

@Component({
	selector: 'app-filler',
	templateUrl: 'filler.component.html'
})
export class FillerComponent {
	constructor(private fillerService: FillerService){
	}

	public selectedFile: File;

	public fileChanges(event: any){
		const filesList = event.target.files;
		if(filesList){
			this.selectedFile = filesList[0];
		}
	}

	public save(){
		this.fillerService.save(this.selectedFile);
	}
}