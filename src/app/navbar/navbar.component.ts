import { Component, OnInit } from '@angular/core';
import { PageSwitchService } from '../page-switch.service';
import { AppPage } from '../page-switch/AppPage';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  selectedItem?
  navItems = [
     // home item params
     {  title : "Home",
        icon : "home",
        page: AppPage.Home
     },
     // playlist item params
     { title : "Playlist",
       icon : "queue_music",
       page: AppPage.Playlist
     },
    // Search page
    { title : "Search",
      icon : "search",
      page: AppPage.Search
    },
       // filter item params
     { title : "Settings",
       icon : "settings",
       page: AppPage.Filter
     }
  ];

  constructor(private pageSwitchService: PageSwitchService) {}

  ngOnInit(): void {
    this.selectedItem = this.findNavItemForPage(this.pageSwitchService.currentPage);
  }

  findNavItemForPage(page) {
    let navItemToReturn;
    this.navItems.forEach(navItem => {
      if (navItem.page === page) {
        navItemToReturn = navItem
      }
    })
    return navItemToReturn
  }

  onClickNavButton(item) {
    this.pageSwitchService.changePage(item.page)
    this.selectedItem = this.findNavItemForPage(this.pageSwitchService.currentPage);
  }
}
