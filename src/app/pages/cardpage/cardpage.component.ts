import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CardService } from '../../service/card.service';
import { Card } from '../../model/card';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cardpage',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './cardpage.component.html',
  styleUrls: ['./cardpage.component.css'],
})
export class CardpageComponent implements OnInit {
  /** Observable que contém a lista de cards */
  cards$: Observable<Card[]> | undefined;

  constructor(private cardService: CardService, private router: Router) { }

  /**
   * Inicializa o componente carregando todos os cards do serviço.
   */
  ngOnInit(): void {
    this.loadCards();
  }

  loadCards() {
    this.cards$ = this.cardService.listarCards();
  }

  onEdit(card: Card) {
    this.router.navigate(['/cards-create', card.id]);
  }

  onDelete(card: Card) {
    if (confirm(`Tem certeza que deseja excluir o card "${card.titulo}"?`)) {
      this.cardService.deletarCard(card.id!).subscribe(() => {
        this.loadCards(); // Recarrega a lista
      });
    }
  }
}
