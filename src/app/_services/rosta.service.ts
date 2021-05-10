import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppState } from '../_store/app.states';
import * as fromAuthSelectors from '../_store/auth/auth.selectors';
import { ShiftRow } from 'src/app/models/shiftRow';

@Injectable({
    providedIn: 'root'
})
export class RostaService implements OnDestroy {
    private BASE_URL = environment.urls.BASE_URL;
    userId$!: Subscription;
    userId = 1;

    constructor(private http: HttpClient, private store: Store<AppState>) {
        this.userId$ = this.store.select(fromAuthSelectors.getUserId).subscribe((u: number) => {
            console.log('user = ', u);
            this.userId = u;
        });

    }
    ngOnDestroy(): void {
        if (this.userId$) {
            this.userId$.unsubscribe();
        }
    }

    convertDate(date: Date): string {
        const yyyy = date.getFullYear().toString();
        const mm = (date.getMonth() + 1).toString();
        const dd = date.getDate().toString();

        const mmChars = mm.split('');
        const ddChars = dd.split('');

        return yyyy + '-' + (mmChars[1] ? mm : '0' + mmChars[0]) + '-' + (ddChars[1] ? dd : '0' + ddChars[0]);
    }


    public getMyDutiesFromDate(weekStart: Date, staffId: number): any {
        const url = `${this.BASE_URL}/mobile/myduty_list/`;
        // const weekStartStr = weekStart.toISOString().split('T')[0];
        if (weekStart === undefined || staffId === 0)  {
            return EMPTY;
        }
        const weekStartStr = this.convertDate(weekStart);
        return this.http.post<any>(url, { weekStartStr, staffId });
    }
}
