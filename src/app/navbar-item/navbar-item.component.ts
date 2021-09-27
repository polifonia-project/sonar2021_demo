import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-item',
  templateUrl: './navbar-item.component.html',
  styleUrls: ['./navbar-item.component.css']
})
export class NavbarItemComponent implements OnInit {

  @Input() title = "";
  @Input() iconName = "";
  @Input() isSelected? : boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
