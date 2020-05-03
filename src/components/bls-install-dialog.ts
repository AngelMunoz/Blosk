import { ProgramType, Program, InstallProgramEvent } from "../types";
import { uuidv4 } from "../utils";

export class BlsInstallDialog {

    programTypes = [
        { type: ProgramType.WebComponent, name: 'Web Component' },
        { type: ProgramType.Website, name: 'Website' }
    ]

    name = '';
    url = '';
    programType = ProgramType.WebComponent;
    tag = '';
    multiInstance = false;
    id = uuidv4();

    constructor(private el: Element) { }

    submit(event: Event) {
        event.preventDefault();
        const program: Program = {
            name: this.name,
            url: this.url,
            programType: this.programType,
            tag: this.tag,
            multiInstance: this.multiInstance,
            id: this.id,
        }
        const detail = { program };
        const dispatched = new CustomEvent<InstallProgramEvent>('install-program', {
            bubbles: true,
            composed: true,
            cancelable: true,
            detail
        });
        this.el.dispatchEvent(dispatched);
    }

}