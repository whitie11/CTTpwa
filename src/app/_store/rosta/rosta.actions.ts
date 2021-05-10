import { Action, createAction, props } from '@ngrx/store';
// import { Duty } from 'src/app/modules/rosta/models/duty';


export const SetDateFrom = createAction(
  '[Rosta] Set date from',
  props<{ dateFrom: Date}>()
);
