export interface WalletTypes {
    code: string,
    name: string,
    description: string | null,
    isActive: boolean,
    payment: {
        code: string,
        name: string
    },
}