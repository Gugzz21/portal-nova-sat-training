import { computed, Injectable, signal } from '@angular/core';
import { SubscribersComponent } from '../components/dashboard/subscribers.component';
import { Widget } from '../models/widget';
import { ViewsComponent } from '../components/dashboard/views/views.component';

@Injectable()
export class DashboardService {

   widgets =  signal<Widget[]>([
    {
    id: 1,
    label: 'Subscribers',
    content: SubscribersComponent
  },
    {
    id: 2,
    label: 'Views',
    content: ViewsComponent
  }
]);

  addedWidgets = signal<Widget[]>([
  {
    id: 1,
    label: 'Subscribers',
    content: SubscribersComponent
  },
  {
    id: 2,
    label: 'Views',
    content: ViewsComponent
  }
]);


  widgetsParaAdicionar = computed(() => {

    const idsAdicionados = this.addedWidgets().map(w => w.id);
    return this.widgets().filter(w => !idsAdicionados.includes(w.id));

  });

  adicionarWidget(w: Widget){
    this.addedWidgets.set([...this.addedWidgets(), {...w}]);
  }





  constructor() { }

}
