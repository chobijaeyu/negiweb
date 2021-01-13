import { prop } from "@rxweb/reactive-form-validators";

export class negifield {
    @prop()
    id?: string | number
    @prop()
    field_name: string = ""
    @prop()
    group_name: string = ""
}