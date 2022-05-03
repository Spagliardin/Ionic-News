import { StorageSevice } from './../../services/storage.service';
import { Component } from '@angular/core';
import { Article } from 'src/app/interfaces';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  get articles(): Article[]{
    return this.storageSevice.localArticles
  }

  constructor(private storageSevice: StorageSevice) {}

}
