import {Component} from 'angular2/core';

import {FiltersService} from "./services/filters-service";
import {SearchPipe} from "./pipes/header-pipe";
import {PaginationPipe} from "./pipes/pagination-pipe";

import {bootstrap}    from 'angular2/platform/browser';
import {Header} from "./components/header/header.component";
import {Pagination} from "./components/pagination/pagination.component";
import {ConfigService} from "./services/config-service";
import {ResourceService} from "./services/resource-service";
import {HttpService} from "./services/http-service";
import {HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/add/operator/map';
import {GlobalSearch} from "./components/global-search/global-search.component";
import {GlobalSearchPipe} from "./pipes/global-search-pipe";

@Component({
    selector: 'ng2-table',
    bindings: [HttpService],
    templateUrl: 'app/table.html',
    directives: [Header, Pagination, GlobalSearch],
    pipes: [SearchPipe, PaginationPipe, GlobalSearchPipe],
    styleUrls: ['app/table.css']
})

export class AppComponent {
    constructor(public filtersService:FiltersService,
                public config:ConfigService,
                public resource:ResourceService,
                public httpService:HttpService
    ) {
        this.numberOfItems = 0;
        this.itemsObservables = httpService.getData();
        this.itemsObservables.subscribe(res => {
            this.data = res;
            this.numberOfItems = res.length;
            this.keys = Object.keys(this.data[0]);
          });
    }

    public data:Array<>;
    public keys:Array<>;
    public numberOfItems:Number;
    public itemsObservables;
    public orderBy(key) {
        this.data = this.resource.sortBy(key);
    };
}

bootstrap(AppComponent, [
    FiltersService,
    ResourceService,
    ConfigService,
    HTTP_PROVIDERS
]);
