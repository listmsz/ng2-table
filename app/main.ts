import {HTTP_PROVIDERS} from 'angular2/http';
import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from "./app.component";
import {FiltersService} from "./services/filters-service";
import {ResourceService} from "./services/resource-service";
import {ConfigService} from "./services/config-service";

bootstrap(AppComponent, [
  FiltersService,
  ResourceService,
  ConfigService,
  HTTP_PROVIDERS
]);