import { Program } from "./program";

export interface DialogClosingEvent {
    title: string;
    id?: string;
}

export interface InstallProgramEvent {
    program: Program;
}