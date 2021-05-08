import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  day: string;
  duty: string;
  others: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {day: 'Mon AM', duty: 'Bickerstaff House', others: 'SB, MW'},
  {day: 'Mon PM', duty: 'Bickerstaff House', others: 'SB, MW'},
  {day: 'Tue AM', duty: 'Collision Ave', others: 'MW'},
  {day: 'Tue PM', duty: 'Collision Ave', others: 'MW'},
  {day: 'Wed AM', duty: '', others: ''},
  {day: 'Wed PM', duty: '', others: ''},
  {day: 'Thur AM', duty: '', others: ''},
  {day: 'Thur PM', duty: '', others: ''},
  {day: 'Fri AM', duty: '', others: ''},
  {day: 'Fri PM', duty: '', others: ''},
];

@Component({
  selector: 'ctt-rosta',
  templateUrl: './rosta.component.html',
  styleUrls: ['./rosta.component.scss']
})
export class RostaComponent implements OnInit {
  weekCommencing!: Date;
  displayedColumns: string[] = ['day', 'duty', 'others'];
  dataSource = ELEMENT_DATA;

  constructor() {
    const dt = new Date(); // current date of week
    const currentWeekDay = dt.getDay();
    const lessDays = currentWeekDay === 0 ? 6 : currentWeekDay - 1;

    this.weekCommencing = new Date(new Date(dt).setDate(dt.getDate() - lessDays));

  //  this.store.dispatch(RostaActions.SetDateFrom({ dateFrom: this.weekCommencing }));

   }

  ngOnInit(): void {
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Only allow Monday to be selected.
    return day === 1;
  }

  dateChanged(wc: any): void {
    console.log('W/C ' + wc);
  //  this.store.dispatch(RostaActions.SetDateFrom({ dateFrom: wc }));
  }

}
