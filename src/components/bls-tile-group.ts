import { bindable, BindingMode } from 'aurelia'

export class BlsTileGroup {

    @bindable({ mode: BindingMode.toView }) title;

}