import { bindable, BindingMode } from 'aurelia';
import { AppWindow, ProgramType } from '../types';

export class BlsWindow {

    @bindable({ mode: BindingMode.twoWay }) title: string;
    @bindable({ mode: BindingMode.toView }) window: AppWindow;

    component: HTMLElement;

    constructor(private el: Element) { }

    afterAttach() {
        if (this.window.program.programType === ProgramType.WebComponent) {
            const tagExists = this._exists(document.head.querySelectorAll('script'), this.window.program.url)
            if (!tagExists) {
                this.appendScriptTag(this.window.program.url);
            }
            this.renderComponent();
        }
    }

    private _exists(scripts: NodeListOf<HTMLScriptElement>, url: string) {
        return Array.from(scripts).find(s => s.src === url);
    }

    beforeDetach() {
        this.component.remove();
    }

    appendScriptTag(url: string) {
        const script = document.createElement('script');
        script.type = "module";
        script.src = url;
        document.head.appendChild(script);
    }

    renderComponent() {
        this.component = document.createElement(this.window.program.tag);
        this.el.appendChild(this.component)
    }

}