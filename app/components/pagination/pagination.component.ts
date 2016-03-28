import {Component, Input, Output, EventEmitter, OnInit} from 'angular2/core';
import {ResourceService} from "../../services/resource-service";

@Component({
  selector: 'pagination',
  templateUrl: 'app///components/pagination/pagination.html',
  styleUrls: ['app/components/pagination/pagination.css']
})

export class Pagination {

  private pageNumber: number;
  private range: number;
  public pageNumbers: Array<>;

  constructor(public resource: ResourceService) {
    this.pageNumber = 1;
    this.range = 5;
    this.pageNumbers = [];
    ResourceService.getPipedData().subscribe(data => {
        console.log("ResourceService.getPipedData().subscribe", data);
      this.numberOfItems = data;
      this.updateNumberPerPage();
    });
  }

  public emitPaginationProperties():void {
    this.updateRange.emit({ range: this.range, page: this.pageNumber });
  }

  public updateNumberPerPage():void {
    if (this.range > this.numberOfItems && this.numberOfItems > 0) {
      this.range = this.numberOfItems;
    }
      console.log("this.range: ", this.range);
      console.log("this.numberOfItems: ", this.numberOfItems);
    let numberPerPage = Math.ceil(this.numberOfItems / this.range);
    this.pageNumbers = Array(numberPerPage).fill().map((_, i) => i + 1);
      console.log("this.pageNumbers: ", this.pageNumbers);
  }

  public updatePagination():void {
    this.updateNumberPerPage();
    this.emitPaginationProperties();
  }

  public isActiveRange(currentRange:Number):boolean {
    return currentRange === this.range;
  }

  public isActivePage(currentPage:Number):boolean {
    return currentPage === this.pageNumber;
  }

  public nextPage():void {
    if(!this.isLastPage()) {
      this.pageNumber++;
    }
  }

  public previousPage():void {
    if(!this.isFirstPage()) {
      this.pageNumber--;
    }
  }

  public isLastPage():boolean {
    return this.pageNumber === this.pageNumbers.length;
  }

  public isFirstPage():boolean {
    return this.pageNumber === 1;
  }

  @Input() numberOfItems:number;
  @Output() updateRange = new EventEmitter();
  ngOnChanges() {
    this.updatePagination();
  }

  changeRange(number):void {
    this.range = number;
    this.pageNumber = 1;
    this.updatePagination();
  }

  changePage(numberOfPage):void {
    this.pageNumber = numberOfPage;
    this.updatePagination();
  }
}
