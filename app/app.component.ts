import {Component, OnInit, OnDestroy} from 'angular2/core';

import {FiltersService} from "./services/filters-service";
import {SearchPipe} from "./pipes/header-pipe";

import {bootstrap}    from 'angular2/platform/browser';
import {Header} from "./components/header/header.component";
import {ConfigService} from "./services/config-service";
import {ResourceService} from "./services/resource-service";
import {HttpService} from "./services/http-service";
import {HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/add/operator/map';
import {GlobalSearch} from "./components/global-search/global-search.component";
import {GlobalSearchPipe} from "./pipes/global-search-pipe";
import {FooterComponent} from "./components/footer/footer.component";

@Component({
    selector: 'ng2-table',
    bindings: [HttpService],
    templateUrl: 'app/table.html',
    directives: [Header, GlobalSearch, FooterComponent],
    pipes: [SearchPipe, GlobalSearchPipe],
    styleUrls: ['app/table.css']
})

export class AppComponent  {
    constructor(public filtersService:FiltersService,
                public config:ConfigService,
                public resource:ResourceService,
                public httpService:HttpService) {

        httpService.getData()
            .subscribe(res => {
                this.data = res;
                this.keys = Object.keys(this.data[0]);
                this.resource.data = this.data;
                this.footer = this.resource.footerSummary();
                // this.footer = this.resource.footer;
                console.log("footer: ", this.footer);
            });
    }

    subscription:any;

    // ngOnInit() {
    //     this.subscription = this.resource.getResourceChangeEmitter()
    //         .subscribe(item => {

    //         });
    // }

    // ngOnDestroy() {
    //     this.subscription.unsubscribe();
    // }

    public data:Array<>;
    public keys:Array<>;
    public footer:Array<>;
    public orderBy = (key) => {
        this.resource.sortBy(key);
    };
}

bootstrap(AppComponent, [
    FiltersService,
    ResourceService,
    ConfigService,
    HTTP_PROVIDERS
]);
