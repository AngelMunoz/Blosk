import { bindable, BindingMode } from 'aurelia'
import { OpenProgramEvent } from '../types';

export class BlsTile {
    @bindable({ mode: BindingMode.toView }) title;
    @bindable({ mode: BindingMode.toView }) programId;

    constructor(private el: Element) { }

    open() {
        const dispatched = new CustomEvent<OpenProgramEvent>('open-program', {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: { name: this.title, programId: this.programId }
        });
        this.el.dispatchEvent(dispatched);
    }
}