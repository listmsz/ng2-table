import {Component} from 'angular2/core';

import {FiltersService} from "./services/filters-service";
import {SearchPipe} from "./pipes/header-pipe";
import {PaginationPipe} from "./pipes/pagination-pipe";


import {Header} from "./components/header/header.component";
import {Pagination} from "./components/pagination/pagination.component";
import {ConfigService} from "./services/config-service";
import {ResourceService} from "./services/resource-service";
import {HttpService} from "./services/http-service";

import 'rxjs/add/operator/map';
import {GlobalSearch} from "./components/global-search/global-search.component";
import {GlobalSearchPipe} from "./pipes/global-search-pipe";
import {CsvExport} from "./components/dropdown/csv-export.component";
import {HTTP_PROVIDERS} from "angular2/http";

@Component({
  selector: 'ng2-table',
  bindings: [HttpService, FiltersService, ResourceService, ConfigService, HTTP_PROVIDERS],
  directives: [Header, Pagination, GlobalSearch, CsvExport],
  pipes: [SearchPipe, PaginationPipe, GlobalSearchPipe],
  template: `
  <global-search
        *ngIf="config.globalSearchEnabled"
        (globalUpdate)="globalSearchTerm = $event">
</global-search>
<csv-export *ngIf="config.exportEnabled"></csv-export>

<table class="ng2-table__table--striped">
    <thead>
    <tr>
        <th [style.display]="config.orderEnabled?'':'none' "
            *ngFor="#key of keys"
            (click)="orderBy(key)">
            {{ key }}
            <span *ngIf="resource.order[key]==='asc' " class="ng2-table__sort-indicator fa fa-chevron-down"></span>
            <span *ngIf="resource.order[key]==='desc' " class="ng2-table__sort-indicator fa fa-chevron-up"></span>
        </th>
        <th [style.display]="!config.orderEnabled?'':'none' "
            *ngFor="#key of keys">
            {{ key }}
        </th>
        <th>Actions</th>
    </tr>
    <tr *ngIf="config.searchEnabled">
        <th *ngFor="#key of keys">
            <table-header (update)="term = $event" [key]="key"></table-header>
        </th>
        <th></th>
    </tr>
    </thead>
    <tbody>
    <tr *ngFor="#row of data | search : term | global : globalSearchTerm | pagination : range">
        <td *ngFor="#key of keys">
            {{ row[key] }}
        </td>
        <td>
            <button class="ng2-table__button">Edit</button>
        </td>
    </tr>
    </tbody>
    <tfoot *ngIf="config.footerEnabled">
    <tr>
        <td *ngFor="#key of keys"></td>
        <td></td>
    </tr>
    </tfoot>
</table>

<pagination [numberOfItems]="numberOfItems" (updateRange)="range = $event"></pagination>

  `
})

export class AppComponent {
  constructor(public filtersService:FiltersService,
              public config:ConfigService,
              public resource:ResourceService,
              public httpService:HttpService) {
    this.numberOfItems = 0;
    this.itemsObservables = httpService.getData();
    this.itemsObservables.subscribe(res => {
      this.data = res;
      this.numberOfItems = res.length;
      this.keys = Object.keys(this.data[0]);
      this.resource.keys = this.keys;
    });
  }

  public data:Array<any>;
  public keys:Array<any>;
  public numberOfItems:number;
  public itemsObservables;

  public orderBy(key:String) {
    this.data = this.resource.sortBy(key);
  };
}


