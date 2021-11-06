import { Form } from "./form.model";
import { User } from "./user.model";

export interface Response {
    id?: number;
    date: Date;
    responseString: string;
    stat: number;
    response?: Answer[];
    user?: User;
    form?: Form;
}

export interface ResponseDTO {
    id?: number;
    date: Date;
    responseString: string;
    stat: number;
    user?: number;
    form?: number;
}

export interface Answer {
    label: string;
    answer: string;
}