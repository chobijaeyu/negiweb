import { prop, propArray } from "@rxweb/reactive-form-validators";
import { calev } from "./calendar.model";

export class titleOption {
    @prop()
    ID?: any
    @prop()
    title: string = ""
}

export class seriesTaskOption {
    @prop()
    id?: string
    @prop()
    title: string = ""
    @propArray(calev)
    tasklist: calev[] = []
}