import { prop } from "@rxweb/reactive-form-validators";

export class negifield {
    @prop()
    ID?: any
    @prop()
    field_name: string = ""
    @prop()
    group_name: string = ""
    @prop()
    active:boolean = false
    @prop()
    address:string = ""
}