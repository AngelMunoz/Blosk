import { computed } from 'aurelia'
import { BlsAppStore } from "./stores/BlsAppStore";
import { DialogClosingEvent } from './types';

export class BlsApp {

  constructor(private appstore: BlsAppStore) {

    this.appstore.addStartGroups({ name: "Uncategorized", order: 0, programs: [] })
    this.appstore.addStartGroups({ name: "Pending", order: 0, programs: [] })
    this.appstore.addStartGroups({ name: "Alv", order: 0, programs: [] })
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
}
