import { IUser } from "./IUser";

export interface IIdentity {
    id: number;
    tc: number;
    name: string;
    surname: string;
    bornCity: string;
    bornDate: string;
    contactId: number;
    user?: IUser;
}
