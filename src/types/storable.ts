export interface Storable<T> {
    saveProps: Array<keyof T>;
    canSave: boolean;
    lastSave?: Date | string;
    readonly state: Partial<T>;
    buildSaveState(): Partial<T>;
    saveState(state: Partial<T>): void;
}
