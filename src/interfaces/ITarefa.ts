import IProjeto from "./IProjeto";

export default interface ITarefa {
    tempoTarefa: number;
    descricao: string,
    projeto: IProjeto,
    id: number
}