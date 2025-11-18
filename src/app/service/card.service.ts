import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor() { }




  getAllCards() {
    return [
      { title: 'Usuários', value: 120, icon: 'person', color: 'text-blue' },
      { title: 'Vendas', value: 75, icon: 'shopping_cart', color: 'text-green' },
      { title: 'Lucro', value: '$1,200', icon: 'attach_money', color: 'text-orange' }
    ];
  }


}
