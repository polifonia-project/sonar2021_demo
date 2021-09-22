import { Component, OnInit } from '@angular/core';
import { PageSwitchService } from '../page-switch.service';
import { AppPage } from './AppPage';





@Component({
  selector: 'app-page-switch',
  templateUrl: './page-switch.component.html',
  styleUrls: ['./page-switch.component.css']
})
export class PageSwitchComponent implements OnInit {

  currentPage: AppPage = AppPage.Home
  AppPage = AppPage

  constructor(private pageSwitchService: PageSwitchService) {
    this.pageSwitchService.appPageChange.subscribe((value) => {
      this.currentPage = value
    })
  }

  ngOnInit(): void {
  }

}
