import { Injectable } from '@angular/core';
import { BehaviorSubject,  } from 'rxjs';
import { AppPage } from './page-switch/AppPage';


@Injectable({
  providedIn: 'root'
})
export class PageSwitchService {

  currentPage: AppPage;

  appPageChange: BehaviorSubject<AppPage> = new BehaviorSubject<AppPage>(AppPage.Home);

  constructor() {
      this.appPageChange.subscribe((value) => {
        this.currentPage = value;
      });
  }

  changePage(newPage: AppPage) {
    this.appPageChange.next(newPage);
  }

}
