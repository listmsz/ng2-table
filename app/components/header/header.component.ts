import {Component, Input, Output, EventEmitter, OnInit} from 'angular2/core';
import {FiltersService} from "../../services/filters-service";

@Component({
  selector: 'table-header',
  template: `
  <input type="text"
       placeholder="Search for {{ key }}"
       class="ng2-table__input"
       #input
       (input)="update.emit({value: input.value, key: key})"
>`
})

export class Header implements OnInit{
  constructor(public filtersService:FiltersService){}
  @Input() key;
  @Output() update = new EventEmitter();
  ngOnInit() {
    this.update.emit({});
  }
}
