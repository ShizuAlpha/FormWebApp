
export interface User {
    id?: number;
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    terminal: string;
    roles: Role[];
}

export interface UserMod {
    id?: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    terminal: string;
    roles: string[];
}

export interface UserSup {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    terminal: string;
}


export interface Role {
    id: number;
    name: string;
}