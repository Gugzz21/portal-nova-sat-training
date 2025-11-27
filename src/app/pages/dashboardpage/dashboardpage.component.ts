import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from "../../components/dashboard/dashboard.component";
import { CardComponent } from "../../components/card/card.component";
import { CreateCardComponent } from "../../components/create-card/create-card.component";
import { CardService } from '../../service/card.service';
import { Card } from '../../model/card';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboardpage',
  standalone: true,
  imports: [CommonModule, DashboardComponent,],
  templateUrl: './dashboardpage.component.html',
  styleUrl: './dashboardpage.component.css'
})
export class DashboardpageComponent{

}
