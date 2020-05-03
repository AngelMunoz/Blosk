import { Program } from "./program";

export interface StartGroup {
    name: string;
    programs: Partial<Program>[];
    order: number;
}