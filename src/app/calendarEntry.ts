export class CalendarEntry {
  constructor(
    public id: string,
    public title: string,
    public start: Date,
    public end: Date,
    public longitude: number,
    public latitude: number,
    public notes: string,
    public attended: boolean,
  ) { }
}
