import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  selectedItem?;
  navItems = [
     // home item params
     {  title : "Home",
        route : "/home",
        icon : "home"
     },  
     // playlist item params
     { title : "Playlist",
       route : "/playlist",
       icon : "queue_music"
     },
       // filter item params
     { title : "Filter",
       route : "/filter",
       icon : "filter_alt"
     }
  ]
  
  constructor() { }

  ngOnInit(): void {
  }

  onSelect(item): void {
    this.selectedItem = item;
  }

}
