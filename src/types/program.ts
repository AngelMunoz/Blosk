import { ProgramType } from "./enums";

export interface Program {
    /**
     * use a uuid like string to identify the program
     */
    id: string
    multiInstance: boolean;
    programType: ProgramType;
    url: string;
    tag?: string;
    category?: string;
    name: string;
}