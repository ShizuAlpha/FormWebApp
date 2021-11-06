import { User } from "./user.model";

export interface Form {
    id?: number;
    name: string;
    date: Date;
    formString: string;
    orientation: boolean;
    user: User;
}

export interface FormDTO {
    id?: number;
    name: string;
    date: Date;
    formString: string;
    orientation: boolean;
    user: number;
}