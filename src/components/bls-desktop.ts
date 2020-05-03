import { bindable, BindingMode } from "aurelia"

export class BlsDesktop {

    @bindable({ mode: BindingMode.toView }) includeUnsplashNotice = true
}