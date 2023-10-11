export default interface IProjeto {
  _id: string;
  nome: string;
  tempoGasto: [{
    data: String,
    tempo: Number
}]
}
