export interface authorizationCode {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    id_token: string;
}

export interface id_token {
    amr: string[]
    aud: string
    email: string
    exp: string
    iat: string
    iss: string
    nonce: string
    sub: string
}