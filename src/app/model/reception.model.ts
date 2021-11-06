import { Form } from "./form.model";
import { User } from "./user.model";

export interface Reception {
    id?: number;
    dateReception: Date;
    status: number;
    user?: User;
    form?: Form;
}

export interface ReceptionDTO {
    id?: number;
    dateReception: Date;
    status: number;
    user?: number;
    form?: number;
}