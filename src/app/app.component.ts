import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from "./features/dashboard/dashboard.component";
import { HomeComponent } from "./features/home/home.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DashboardComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portal-nova-sat-training';
}
