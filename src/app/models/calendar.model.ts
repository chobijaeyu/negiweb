import { CalendarEvent } from 'angular-calendar';
import { EventColor, EventAction } from "calendar-utils";
import { prop } from '@rxweb/reactive-form-validators';

export class calev implements CalendarEvent {
    @prop()
    id?: string | number;
    @prop()
    start: Date = new Date(20200101);
    @prop()
    end?: Date;
    @prop()
    title: string = "";
    color?: EventColor;
    actions?: EventAction[];
    Operator?: string
    Priority?: number
    Completed?: boolean
    @prop()
    allDay?: boolean;
    @prop()
    cssClass?: string;
    @prop({ defaultValue: { beforeStart: true, afterEnd: true } })
    resizable?: resizable = {};
    @prop({ defaultValue: true })
    draggable?: boolean;
}

export interface Holiday {
    date: string;
    name: string;
}

interface resizable {
    beforeStart?: boolean;
    afterEnd?: boolean;
}