import { Program } from "./program";

export interface DialogClosingEvent {
    title: string;
    id?: string;
}

export interface InstallProgramEvent {
    program: Program;
}

export interface OpenProgramEvent {
    programId: string;
    name?: string;
}