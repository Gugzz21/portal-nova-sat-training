import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { WidgetComponent } from "../widget/widget.component";
import { MatButtonModule} from '@angular/material/button';
import { MatIcon} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, WidgetComponent, MatButtonModule, MatIcon, MatMenuModule],
  providers: [DashboardService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  store = inject(DashboardService)
  }

