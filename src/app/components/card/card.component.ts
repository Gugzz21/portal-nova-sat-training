import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'; // <--- IMPORTANTE

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatIconModule], // <--- Adicione aqui para o <mat-icon> funcionar
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() id: number | undefined; // Necessário para editar/excluir
  @Input() titulo: string = '';
  @Input() descricao: string = '';
  @Input() imagem: string = '';

  // Role deve corresponder ao Enum do backend
  @Input() role: 'ROLE_ABERTO' | 'ROLE_FINALIZADO' | 'ROLE_CANCELADO' = 'ROLE_ABERTO';

  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}
