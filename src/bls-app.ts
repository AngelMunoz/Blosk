import { computed } from 'aurelia'
import { BlsAppStore } from "./stores/BlsAppStore";
import { DialogClosingEvent, InstallProgramEvent, OpenProgramEvent, AppWindow } from './types';
import { uuidv4 } from './utils';

export class BlsApp {

  constructor(private appstore: BlsAppStore) {
    this.appstore.restoreFromStorage();
    this.appstore.addStartGroups({ name: "Uncategorized", order: 0, programs: [] });
  }

  @computed({ static: true })
  get isStartOpen() {
    return this.appstore.isStartOpen
  }

  @computed({ static: true })
  get icons() {
    return this.appstore.icons;
  }

  @computed({ static: true })
  get windows() {
    return this.appstore.windows;
  }

  @computed({ static: true })
  get dialogs() {
    return this.appstore.dialogs;
  }

  @computed({ static: true })
  get programs() {
    return this.appstore.programs;
  }

  @computed({ static: true })
  get backgroundUrl() {
    return this.appstore.backgroundUrl
  }

  @computed({ static: true })
  get startGroups() {
    return this.appstore.startGroups;
  }

  openProgram(event: CustomEvent<OpenProgramEvent>) {
    const { detail } = event;
    const program = this.programs.find(p => p.id === detail.programId || p.name === detail.name);
    const windows = this.windows.filter(w => w.program.id === program.id);
    if (!program.multiInstance && windows.length === 1) return;
    const window: AppWindow = {
      id: uuidv4(),
      program: program,
      title: detail.name
    }
    this.appstore.addWindow(window);
    this.appstore.isStartOpen = false;
  }

  openStart() {
    if (this.appstore.isStartOpen) {
      this.appstore.isStartOpen = false;
    } else {
      this.appstore.isStartOpen = true;
    }
    console.log(this.appstore.isStartOpen);
  }

  closeStart() {
    this.appstore.isStartOpen = false;
    console.log(this.appstore.isStartOpen);
  }

  closeDialog(event: CustomEvent<DialogClosingEvent>) {
    const { title } = event.detail;
    this.appstore.removeDialog(title);
  }

  installProgram(event: CustomEvent<InstallProgramEvent>) {
    const { program } = event.detail;
    this.appstore.addProgram(program);
  }
}
