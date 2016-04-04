import {Pipe} from 'angular2/core';
import {FiltersService} from "../services/filters-service";
import {ResourceService} from "../services/resource-service";

@Pipe({
  name: 'search'
})

export class SearchPipe {
  constructor(public filtersService:FiltersService,
              public resource:ResourceService) {
  }

  transform(value, [filters]) {
    if (typeof value === "undefined") {
      return;
    }
    this.resource.data = value.slice();

    if (typeof filters === 'undefined' || Object.keys(filters).length === 0) {
      return this.resource.data;
    }

    this.filtersService.update(filters.key, filters.value);
    let filtersArr = this.filtersService.get();

    value.forEach((item) => {
      for (var filterKey in filtersArr) {
        if (filtersArr.hasOwnProperty(filterKey)) {
          let element;
          if (typeof item[filterKey] === "string") {
            element = item[filterKey].toLocaleLowerCase();
          }
          if (typeof item[filterKey] === "object") {
            element = JSON.stringify(item[filterKey]);
          }
          if (typeof item[filterKey] === "number") {
            element = item[filterKey].toString();
          }
          if (element.indexOf(filtersArr[filterKey].toLocaleLowerCase()) === -1) {
            this.resource.data.splice(this.resource.data.indexOf(item), 1);
            return;
          }
        }
      }
    });

    return this.resource.data;
  }
}
