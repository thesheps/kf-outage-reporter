export default class Outage {
  id: String;
  begin: Date;
  end: Date;

  constructor(id: String, begin: Date, end: Date) {
    this.id = id;
    this.begin = begin;
    this.end = end;
  }
}
