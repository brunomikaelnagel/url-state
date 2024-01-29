export interface IClient {
    id: number
    nome: string
    idade: number
}

export function isIClient( obj: any | unknown ):obj is IClient {
    return typeof obj === "object" &&
        "id" in obj &&
        "nome" in obj &&
        "idade" in obj &&
        typeof obj.id === "number" &&
        typeof obj.nome === "string" &&
        typeof obj.idade === "number";
}

export function isClientList(obj: any[]  | unknown[]): obj is IClient[] {
    return obj.every(item => isIClient(item));
}
