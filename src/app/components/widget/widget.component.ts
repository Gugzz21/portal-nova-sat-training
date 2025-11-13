import { Component, input, signal } from '@angular/core';
import { Widget } from '../../models/widget';
import { NgComponentOutlet } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { WidgetOptionsComponent } from "./widget-options/widget-options.component";

@Component({
  selector: 'app-widget',
  imports: [NgComponentOutlet, MatButtonModule, MatIcon, WidgetOptionsComponent],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.css'
})
export class WidgetComponent {
  data = input.required<Widget>();

  mostrarOpcoes = signal(false);
}
