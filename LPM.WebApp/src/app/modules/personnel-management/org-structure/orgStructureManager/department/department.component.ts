import { Component, Input } from '@angular/core'
import { Guid } from 'guid-typescript';

@Component({
    selector: 'app-department',
    templateUrl: 'department.component.html'
})
export class DepartmentComponent {
    @Input()
    userId?: Guid;
}