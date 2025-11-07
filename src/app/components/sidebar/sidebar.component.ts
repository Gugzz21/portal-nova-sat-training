import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

interface MenuItem {
  icon: string;
  label: string;
  children?: MenuItem[];
  isOpen?: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [CommonModule]
})
export class SidebarComponent {
  @Input() isSidebarCollapsed = false;
  @Output() sidebarToggle = new EventEmitter<void>();

  menuItems: MenuItem[] = [
    {
      icon: 'fas fa-home',
      label: 'Dashboard',
      isOpen: false,
      children: [
        { icon: 'fas fa-chart-pie', label: 'Gráficos' },
        { icon: 'fas fa-tasks', label: 'Projetos' },
      ]
    },
    {
      icon: 'fas fa-cog',
      label: 'Configurações',
      isOpen: false,
      children: [
        { icon: 'fas fa-user', label: 'Blablabla' },
        { icon: 'fas fa-lock', label: 'Security' },
      ]
    },
    {
      icon: 'fas fa-envelope',
      label: 'Mensagens'
    }
  ];

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

  toggleMenuItem(item: MenuItem) {
    if (!this.isSidebarCollapsed && item.children) {
      item.isOpen = !item.isOpen;
    }
  }
}
