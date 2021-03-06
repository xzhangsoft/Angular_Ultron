import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAngelWidget, IAngelPage, IAngelEvent } from '../interface';
import { AppService } from '../app.service';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {
  zindexInit = 10;
  showSpinner = true;
  editingWidgets: IAngelWidget[] = [];
  zindexAdd = 10;

  pageMetadata: IAngelPage[];
  eventMetadata: IAngelEvent[];

  constructor(private router: ActivatedRoute, private appService: AppService) {
    setTimeout(() => {
      this.showSpinner = false;
    }, 500);
  }

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      if (Object.keys(params).length !== 0) {
        console.log(params);
        this.editingWidgets = JSON.parse(params.page).widgets;
      }
    });
    this.getMetadata();
  }

  getMetadata() {
    this.pageMetadata = this.appService.getPageMetadata();
    this.eventMetadata = this.appService.getEventConfig();
  }

  flow(event: { type: string; item: IAngelWidget }) {
    const type = event.type;
    const triggerWidgetId = event.item.id;
    if (type === 'goNext' && this.eventMetadata.some(data => data.widgetId === triggerWidgetId)) {
      console.log('goNext');
      // Todo ...
    }
  }
}
