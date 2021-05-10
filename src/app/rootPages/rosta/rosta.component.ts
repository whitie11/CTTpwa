import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { ShiftRow } from 'src/app/models/shiftRow';
import { RostaService } from 'src/app/_services/rosta.service';
import { AppState } from 'src/app/_store/app.states';
import { getStaffId } from 'src/app/_store/auth/auth.selectors';
import * as RostaActions from '../../_store/rosta/rosta.actions';
import { dateFromStore } from '../../_store/rosta/rosta.selectors';

const SHIFT_DATA: ShiftRow[] = [
  { day: 'Mon AM', duty: 'Woodlands, Lytham St Annes', others: 'SB, MW' },
  { day: 'Mon PM', duty: 'Bickerstaff House', others: 'SB, MW' },
  { day: 'Tue AM', duty: 'Collision Ave', others: 'MW' },
  { day: 'Tue PM', duty: 'Collision Ave', others: 'MW' },
  { day: 'Wed AM', duty: '', others: '' },
  { day: 'Wed PM', duty: '', others: '' },
  { day: 'Thur AM', duty: '', others: '' },
  { day: 'Thur PM', duty: '', others: '' },
  { day: 'Fri AM', duty: '', others: '' },
  { day: 'Fri PM', duty: '', others: '' },
];

@Component({
  selector: 'ctt-rosta',
  templateUrl: './rosta.component.html',
  styleUrls: ['./rosta.component.scss']
})
export class RostaComponent implements OnInit {

  weekCommencing!: Date;
  displayedColumns: string[] = ['day', 'duty', 'others'];
  dataSource: any;
  dutyList$: any;
  staffId!: any;

  constructor(private rostaService: RostaService, private store: Store<AppState>) {
    const dt = new Date(); // current date of week
    const currentWeekDay = dt.getDay();
    const lessDays = currentWeekDay === 0 ? 6 : currentWeekDay - 1;
    this.weekCommencing = new Date(new Date(dt).setDate(dt.getDate() - lessDays));
    this.store.dispatch(RostaActions.SetDateFrom({ dateFrom: this.weekCommencing }));


  }

  ngOnInit(): void {
    const staffId$ = this.store.select(getStaffId);
    staffId$.subscribe( st => {
      this.staffId = st;
    });
    const wc = this.store.select(dateFromStore);
    wc.subscribe(w => {
      this.weekCommencing = w;
      this.dutyList$ = this.rostaService.getMyDutiesFromDate(w, this.staffId).subscribe((list: ShiftRow[]) => {
       const r = new MatTableDataSource();
       this.dataSource = new MatTableDataSource<ShiftRow>(list);

    });
  });
}

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Only allow Monday to be selected.
    return day === 1;
  }

  dateChanged(wc: any): void {
    console.log('W/C ' + wc);
    this.store.dispatch(RostaActions.SetDateFrom({ dateFrom: wc }));
  }

}
