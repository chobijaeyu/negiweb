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

export const priorities = [
    { value: 1, viewValue: '緊急' },
    { value: 2, viewValue: '重要' },
    { value: 3, viewValue: '一般' },
]