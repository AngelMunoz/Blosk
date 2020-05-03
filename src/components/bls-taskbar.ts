import iconSrc from '../images/start-icon.png';

export class BlsTaskbar {
    iconSrc = iconSrc

    constructor(private el: Element) {

    }

    openStart(event: MouseEvent) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        this.el.dispatchEvent(new Event('open-start', { bubbles: true, cancelable: true, composed: true }));
    }

    closeStart(event: MouseEvent) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        this.el.dispatchEvent(new Event('close-start', { bubbles: true, cancelable: true, composed: true }));
    }
}