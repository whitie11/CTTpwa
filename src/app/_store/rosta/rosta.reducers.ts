import { Action, createReducer, on } from '@ngrx/store';
// import { Duty } from 'src/app/modules/rosta/models/duty';
import * as RostaActions from './rosta.actions';

export interface RostaState {
    isWorking: boolean;
    // duties: Duty[];
    dateFrom: Date;
    // staffIdList: number[];
    // dutyIdList: number[];
}

export const initialState: RostaState = {
    isWorking: false,
    // duties: [],
    dateFrom: new Date('2021,1,4'),
    // staffIdList: [1, 2, 5],
    // dutyIdList: [1, 2, 3]
};


const reducer = createReducer(
    initialState,
    on(RostaActions.SetDateFrom, (state: RostaState, { dateFrom }) => {
        return { ...state, dateFrom, };
    }),
    // on(RostaActions.SetStaffIdList, (state: RostaState, { staffIdList }) => {
    //     return { ...state, staffIdList, };
    // }),
    // on(RostaActions.SetDutyIdList, (state: RostaState, { dutyIdList }) => {
    //     return { ...state, dutyIdList, };
    // }),
    // on(RostaActions.GetDuties, (state: RostaState, { }) => {
    //     return { ...state, isWorking: true };
    // }),
    // on(RostaActions.GetDutiesSuccess, (state: RostaState, { duties }) => {
    //     return { ...state, isWorking: false, duties };
    // }),
    // on(RostaActions.GetDutiesFailure, (state: RostaState, { }) => {
    //     return { ...state, isWorking: false };
    // }),
);

export function rostaReducer(state: RostaState | undefined, action: Action): any{
    return reducer(state, action);
}
