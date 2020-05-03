import { Icon } from "./icon";
import { Program } from "./program";
import { AppWindow } from "./app-window";
import { Theme } from "./enums";
import { StartGroup } from "./start-group";
import { BlsDialog } from "./bls-dialog";

export interface AppState {
    isStartOpen: boolean;
    startGroups: StartGroup[];
    icons: Icon[];
    programs: Program[];
    windows: AppWindow[];
    dialogs: BlsDialog[];
    backgroundUrl: string;
    theme: Theme
}