import {Component, Input, Output, EventEmitter, OnInit} from 'angular2/core';
import {ResourceService} from "../../services/resource-service";

@Component({
  selector: 'pagination',
  template: `
<ul class="ng2-table__pagination">
    <li [class.disabled]="isFirstPage()">
        <a href="#" (click)="previousPage()">«</a>
    </li>

    <li *ngFor="#page of pageNumbers" [class.active]="isActivePage(page)">
        <a href="#" (click)="changePage(page)">{{page}}</a>
    </li>

    <li [class.disabled]="isLastPage()">
        <a href="#" (click)="nextPage()">»</a>
    </li>
</ul>

<ul class="ng2-table__items-per-page">
    <li [class.active]="isActiveRange(5)"><a href="#" (click)="changeRange(5)"  class="btn btn-default">5</a></li>
    <li [class.active]="isActiveRange(10)"><a href="#" (click)="changeRange(10)" class="btn btn-default">10</a></li>
    <li [class.active]="isActiveRange(25)"><a href="#" (click)="changeRange(25)" class="btn btn-default">25</a></li>
    <li [class.active]="isActiveRange(50)"><a href="#" (click)="changeRange(50)" class="btn btn-default">50</a></li>
    <li [class.active]="isActiveRange(100)"><a href="#" (click)="changeRange(100)" class="btn btn-default">100</a></li>
</ul>
`
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
      this.numberOfItems = data;
      this.updateNumberPerPage();
    });
  }


  public emitPaginationProperties():void {
    this.updateRange.emit({ range: this.range, page: this.pageNumber });
  }

  public updateNumberPerPage():void {
    // issue #5
    // if (this.range > this.numberOfItems && this.numberOfItems > 0) {
    //   this.range = this.numberOfItems;
    // }
    let numberPerPage = Math.ceil(this.numberOfItems / this.range);
    this.pageNumbers = Array(numberPerPage).fill().map((_, i) => i + 1);
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
