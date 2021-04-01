import { prop } from "@rxweb/reactive-form-validators";

export class titleOption {
    @prop()
    ID?: any
    @prop()
    title: string = ""
}