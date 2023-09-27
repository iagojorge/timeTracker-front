export enum TipoNotificacao {
  SUCESSO,
  ERRO,
  ATENCAO,
}

export interface INotificacao {
  titulo: string;
  texto: string;
  tipo: TipoNotificacao;
  id: number;
}
