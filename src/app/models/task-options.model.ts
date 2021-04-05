import { prop, propArray } from "@rxweb/reactive-form-validators";

export class titleOption {
    @prop()
    ID?: any
    @prop()
    title: string = ""
}

export class seriesTaskSingleTask {
    @prop()
    ID?: any
    @prop()
    title: string = ""
    @prop()
    start: number = 0
    @prop()
    end!: number 
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