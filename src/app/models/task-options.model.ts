import { prop, propArray } from "@rxweb/reactive-form-validators";

export class titleOption {
    @prop()
    ID?: any
    @prop()
    title: string = ""
}

export class seriesTaskSingleTask {
    @prop()
    title: string = ""
    @prop()
    allDay: boolean = true
    @prop()
    start: number = 0
    @prop()
    end: number = 0
    @prop()
    priority?: number = 3
}
export class seriesTaskOption {
    @prop()
    ID?: any
    @prop()
    title: string = ""
    @propArray(seriesTaskSingleTask)
    tasklist: seriesTaskSingleTask[] = []
}