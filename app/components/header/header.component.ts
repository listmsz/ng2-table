import {Component, Input, Output, EventEmitter, OnInit} from 'angular2/core';
import {FiltersService} from "../../services/filters-service";

@Component({
  selector: 'table-header',
  templateUrl: 'app///components/header/header.html'
})

export class Header implements OnInit{
  constructor(public filtersService:FiltersService){}
  @Input() key;
  @Output() update = new EventEmitter();
  ngOnInit() {
    this.update.emit({});
  }
}
