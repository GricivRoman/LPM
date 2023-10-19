import { Component, Input } from "@angular/core";
import { BaseControlComponent } from "../baseControl.component";

@Component({
    selector: 'app-forc-text-area',
    templateUrl: 'textAreaControl.component.html'
})
export class TextAreaControlComponent extends BaseControlComponent {
    @Input()
    rows: number;

    @Input()
    cols: number;

    @Input()
    maxLength: number;
}