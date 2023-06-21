import { TypeModel } from "./type-model";

export class EventModel {
    public _id: string;
    public type: TypeModel;
    public typeId: string;
    public date: string;
    public description: string;
    public address: string;
    public invitations: number;
    public started: boolean;
}