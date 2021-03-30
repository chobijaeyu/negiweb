import { prop } from "@rxweb/reactive-form-validators";

export class titleOption {
    @prop()
    id?: any
    @prop()
    title: string = ""
}