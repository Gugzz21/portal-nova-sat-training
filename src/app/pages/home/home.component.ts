import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { SidenavComponent } from "../../components/sidenav/sidenav.component";
import {  RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-home',
  imports: [HeaderComponent, SidenavComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  public isSidenavVisible = false;

  // Mostra ou esconde a sidebar
  toggleSidenav(): void {
    this.isSidenavVisible = !this.isSidenavVisible;
  }

  // Garante que a sidebar seja fechada
  closeSidenav(): void {
    this.isSidenavVisible = false;
  }


}
