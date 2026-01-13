import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
  @Input() titulo: string = '';
  @Input() descricao: string = '';
  @Input() imagem: string = '';

  /** Define se é 'image' ou 'icon' (padrão 'image' para compatibilidade) */
  @Input() role: 'image' | 'icon' = 'image';
}
