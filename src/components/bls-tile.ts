import { bindable, BindingMode } from 'aurelia'

export class BlsTile {
    @bindable({ mode: BindingMode.toView }) title;

}