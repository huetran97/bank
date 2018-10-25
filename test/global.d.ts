declare var global: NodeJS.Global;

declare namespace NodeJS {
    export interface Global {
        access_token: string
        refresh_token: string
        payee_id: string
        transaction_id: string
    }
}