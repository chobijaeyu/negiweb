import { prop } from '@rxweb/reactive-form-validators';

export class member {
    @prop()
    uid!: string
    @prop()
    displayName!: string
    @prop()
    role!: number
    @prop()
    photoUrl!: string
    CustomClaims?: any
    @prop()
    disabled!: boolean
}

export interface authApi {
    userdata: member
}

export enum memberRoles {
    admin = 1,
    owner,
    manager,
    employee,
    parttime,
}