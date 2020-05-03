import {
    AppState,
    AppWindow,
    Program,
    Icon,
    Storable,
    Theme,
    StartGroup,
    BlsDialog
} from '../types';
import { uuidv4 } from '../utils';


export class BlsAppStore implements Storable<AppState> {

    canSave = true;
    readonly saveProps: Array<keyof AppState> = ['backgroundUrl', 'icons', 'programs', 'theme']
    lastSave?: string | Date = null;
    private _state: Partial<AppState> = {
        startGroups: [],
        programs: [],
        windows: [],
        dialogs: [],
        icons: [],
        isStartOpen: false,
        backgroundUrl: 'https://source.unsplash.com/daily?ar=2:1',
        theme: Theme.Dark
    };

    buildSaveState(): Partial<AppState> {
        return this.saveProps.reduce((current, next) => {
            current[next] = this.state[next];
            return current;
        }, {});
    }

    saveState(state: Partial<AppState>) {
        const _state = { ...this._state };
        for (const key of Object.keys(state)) {
            _state[key] = state[key];
        }
        this._state = { ..._state };
    }

    get state() {
        return this._state;
    }

    get windows() {
        const windows = this.state?.windows ?? [];
        return [...windows];
    }

    addWindow(window: AppWindow) {
        if (this.windows.find(w => w.id === window.id)) return;
        const program = this.programs.find(p => p.id === window.program);
        const windowCount = this.windows.filter(w => w.program === window.program).length;
        let windows: AppWindow[];
        if (program && program.multiInstance && windowCount >= 0) {
            windows = [...this.windows, window];
        } else if (program && windowCount === 0) {
            windows = [...this.windows, window];
        }
        this.saveState({ windows });
    }

    removeWindow(id: string) {
        const windows = this.windows.filter(w => w.id !== id);
        this.saveState({ windows });
    }

    get dialogs() {
        const dialogs = this.state?.dialogs ?? [];
        return [...dialogs];
    }

    addDialog(dialog: BlsDialog) {
        if (this.dialogs.find(d => d.title === dialog.title || d.id === dialog.id)) return;
        this.saveState({ dialogs: [...this.dialogs, dialog] });
    }

    removeDialog(title: string) {
        const dialogs = this.dialogs.filter(dialog => dialog.title !== title);
        this.saveState({ dialogs });
    }

    get programs() {
        const programs = this.state?.programs ?? [];
        return [...programs];
    }

    addProgram(program: Program) {
        if (this.programs.find(p => p.id === program.id)) return;
        const programs = [...this.programs, program];
        this.saveState({ programs });
        this.rebuildGroups();
    }

    get startGroups() {
        const startGroups = this.state?.startGroups ?? [];
        return [...startGroups];
    }

    addStartGroups(group: StartGroup) {
        if (this.startGroups.find(p => p.name === group.name)) return;
        const startGroups = [...this.startGroups, group];
        this.saveState({ startGroups });
    }

    removeProgram(id: string) {
        const programs = this.programs.filter(p => p.id !== id);
        this.saveState({ programs });
    }

    rebuildGroups() {
        const startGroups = this.startGroups.map(group => {
            const programs = group.programs = this.programs.filter(p => {
                if (group.name.toLowerCase() === "uncategorized") {
                    return !p.category;
                }
                return p.category === group.name;
            });
            return { ...group, programs };
        });
        this.saveState({ startGroups });
    }

    get icons() {
        const icons = this.state?.icons ?? [];
        return [...icons];
    }

    addIcon(icon: Icon) {
        if (this.icons.find(i => i.id === icon.id)) return;
        const icons = [...this.icons, icon];
        this.saveState({ icons });
    }

    removeIcon(id: string) {
        const icons = this.icons.filter(p => p.id !== id);
        this.saveState({ icons });
    }

    get isStartOpen() {
        return this.state.isStartOpen;
    }

    set isStartOpen(value: boolean) {
        if (typeof value !== 'boolean') return;
        this.saveState({ isStartOpen: value });
    }

    get backgroundUrl() {
        return this.state.backgroundUrl
    }

    set backgroundUrl(value: string) {
        if (typeof value !== 'string') return;
        this.saveState({ backgroundUrl: value });
    }

    get theme() {
        return this.state.theme;
    }

    set theme(value: Theme) {
        this.saveState({ theme: value });
    }

    get includeUnsplashNotice() {
        return this.backgroundUrl.includes('unsplash')
    }

}
