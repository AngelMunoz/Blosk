import { bindable, BindingMode } from 'aurelia';
import { uuidv4 } from '../utils';
import { DialogClosingEvent } from '../types';

export class BlsDialog {

    @bindable({ mode: BindingMode.toView })
    title = '';

    @bindable({ mode: BindingMode.toView })
    identity = uuidv4();

    constructor(private el: Element) { }

    close(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        const dispatch = new CustomEvent<DialogClosingEvent>('close-dialog', {
            bubbles: true,
            composed: true,
            cancelable: true,
            detail: { title: this.title, id: this.identity }
        });
        this.el.dispatchEvent(dispatch);
    }

    dragEnd(event: DragEvent) {
        event.preventDefault();
        const target = event.target as HTMLElement;
        const { pageX, pageY } = event;
        const maxWidth = document.body.clientWidth;
        const maxHeight = document.querySelector('bls-desktop')?.clientHeight ?? 100;
        const finalX = pageX > maxWidth ? maxWidth - 35 : pageX <= 25 ? 25 : pageX;
        const finalY = pageY > maxHeight ? maxHeight - 35 : pageY <= 25 ? 25 : pageY;
        target.style.left = `${finalX}px`;
        target.style.top = `${finalY}px`;
    }

}