import { User } from "./user.model";

export interface InputModel {
    id?: number;
    nature: number;
    label: string;
    required: boolean;
    type?: string;
    selectEntries?: SelectEntry[];
    multiple?: boolean;
    fontSize?: string;
    fontWeight?: string;
    textAlign?: string;
    answer?: string;
    user?: number;
}

export interface InputModelDTO {
    id?: number;
    nature: number;
    label: string;
    required: boolean;
    type?: string;
    selectEntries?: string;
    multiple?: boolean;
    fontSize?: string;
    fontWeight?: string;
    textAlign?: string;
    user?: number;
}

export interface SelectEntry {
    value: string;
    viewValue: string;
}
