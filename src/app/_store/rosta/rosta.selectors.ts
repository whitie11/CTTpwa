import { createSelector, createFeatureSelector } from '@ngrx/store';
import { RostaState } from './rosta.reducers';

export const selectRostaState = createFeatureSelector<RostaState>('rosta');

// export const dutiesFromStore = createSelector(selectRostaState,
//     (state: RostaState) => state.duties);

export const dateFromStore = createSelector(selectRostaState,
    (state: RostaState) => state.dateFrom);

// export const staffIdsFromStore = createSelector(selectRostaState,
//     (state: RostaState) => state.staffIdList);

// export const dutyIdsFromStore = createSelector(selectRostaState,
//     (state: RostaState) => state.dutyIdList);
