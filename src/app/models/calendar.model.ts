import { CalendarEvent } from 'angular-calendar';
import { EventColor, EventAction } from "calendar-utils";
import { prop } from '@rxweb/reactive-form-validators';
import { negifield } from './field.model';

export class calev implements CalendarEvent {
    @prop()
    ID?: any;
    @prop()
    start!: Date;
    @prop()
    end?: Date;
    @prop()
    title: string = "";
    color?: EventColor;
    actions?: EventAction[];
    @prop()
    operator?: string
    @prop()
    priority?: number = 3
    @prop()
    completed?: boolean
    @prop()
    allDay?: boolean = true;
    @prop()
    cssClass?: string;
    // @prop({ defaultValue: { beforeStart: true, afterEnd: true } })
    // resizable?: resizable = {};
    @prop({ defaultValue: true })
    draggable?: boolean;
    @prop()
    NegiFieldID?: any
}

export interface Holiday {
    date: string;
    name: string;
}

interface resizable {
    beforeStart?: boolean;
    afterEnd?: boolean;
}