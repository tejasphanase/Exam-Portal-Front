import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  activeColor:string='';

  constructor() { }

  ngOnInit(): void {
  }

  setActiveColor(menu:string)
  {
    this.activeColor=menu;
  }

}
