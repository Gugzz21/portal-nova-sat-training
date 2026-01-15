import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { Card } from '../model/card';
import { environment } from '../../enviroment';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private apiCard = environment.apiCard;

  constructor(private http: HttpClient) { }

  criarCard(card: Card): Observable<Card> {
    return this.http.post<Card>(`${this.apiCard}/criar`, card).pipe(catchError(this.errorHandler));
  }

  listarCards(): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.apiCard}/listar`).pipe(catchError(this.errorHandler));
  }

  obterCardPorId(id: number): Observable<Card> {
    return this.http.get<Card>(`${this.apiCard}/listarPorId/${id}`).pipe(catchError(this.errorHandler));
  }

  listarCardPorId(id: number): Observable<Card> {
    return this.http.get<Card>(`${this.apiCard}/listarPorId/${id}`).pipe(catchError(this.errorHandler));
  }

  atualizarCard(card: Card): Observable<Card> {
    return this.http.put<Card>(`${this.apiCard}/atualizar/${card.id}`, card).pipe(catchError(this.errorHandler));
  }

  deletarCard(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiCard}/deletar/${id}`).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any): Observable<any> {
    console.error('Ocorreu um erro', error);
    return throwError(() => error);
  }

  // /** URL do arquivo JSON com os dados iniciais dos cards */
  // private dataUrl = 'assets/data/cards.json';

  // /** Subject para gerenciar o estado dos cards */
  // private cardsSubject = new BehaviorSubject<Card[]>([]);

  // /** Observable exposto para os componentes consumirem a lista de cards */
  // cards$ = this.cardsSubject.asObservable();

  // constructor(private http: HttpClient) {
  //   this.loadInitialCards();
  // }

  // /**
  //  * Carrega os cards iniciais a partir do arquivo JSON.
  //  */
  // private loadInitialCards() {
  //   this.http.get<Card[]>(this.dataUrl).subscribe(cards => {
  //     this.cardsSubject.next(cards);
  //   });
  // }

  // /**
  //  * Retorna o Observable com a lista de cards.
  //  * @returns Observable<Card[]>
  //  */
  // getAllCards(): Observable<Card[]> {
  //   return this.cards$;
  // }

  // /**
  //  * Adiciona um novo card à lista.
  //  * @param card Objeto Card a ser adicionado
  //  */
  // addCard(card: Card) {
  //   const currentCards = this.cardsSubject.value;
  //   this.cardsSubject.next([...currentCards, card]);
  // }

  // /**
  //  * Simula a exclusão de um card.
  //  * @param cardId ID do card a ser apagado
  //  * @returns Objeto simulando uma resposta HTTP
  //  */
  // apagar(cardId: number) {
  //   // Simula uma chamada HTTP para apagar o card
  //   return {
  //     subscribe: (callback: (res: any) => void) => {
  //       console.log(`Card com ID ${cardId} deletado.`);
  //       callback({ success: true });
  //     }
  //   };
  // }
}
