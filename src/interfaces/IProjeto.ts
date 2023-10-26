export default interface IProjeto {
  id: string;
  name: string;
  timeSpent: [
    {
      date: String;
      time: Number;
    }
  ];
  timeTotalProject: number;
  timeTotalToday: number;
}
